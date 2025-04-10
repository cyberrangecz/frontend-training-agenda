import { Team, TrainingInstanceLobby, TrainingUser } from '@crczp/training-model';
import { BehaviorSubject, concat, concatMap, Observable, of, Subject, takeUntil, throwError } from 'rxjs';
import { TeamManagementService } from './team-management-service';
import { TrainingInstanceLobbyApi } from '@crczp/training-api';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import * as uuid from 'uuid';
import { TrainingAgendaConfig } from '@crczp/training-agenda';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArrayHelper } from '../../../internal/src/utils/array-helper';

type UserId = TrainingUser['id'];
type TeamId = Team['id'];

type LobbyIdMap = {
    queue: { [userId: number]: TrainingUser };
    teams: { [teamId: number | string]: Team };
    lockedTeams: Team[];
};

@Injectable()
export class TeamManagementConcreteService extends TeamManagementService {
    constructor(
        private lobbyApi: TrainingInstanceLobbyApi,
        private config: TrainingAgendaConfig,
        private activeRoute: ActivatedRoute,
    ) {
        super();
    }

    private readonly teamSizeWarning = (teamId?: number) =>
        `Team ${teamId !== undefined ? teamId : ''} has more than ${this.maxTeamSize} members!`;
    private errorNotifier$ = new Subject<void>();

    private readonly idMapSubject = new BehaviorSubject<LobbyIdMap>({ queue: [], teams: {}, lockedTeams: [] });
    private readonly loadingSubject = new BehaviorSubject<boolean>(true);

    public readonly lobby$ = this.idMapSubject.asObservable().pipe(map(this.idMapToLobby));
    public readonly loadingData$ = this.loadingSubject.asObservable();

    private maxTeamSize: number;
    private trainingInstanceId: number;

    public init(instanceId: number, maxTeamSize: number): void {
        this.trainingInstanceId = instanceId;
        this.maxTeamSize = maxTeamSize;
    }

    private idMapToLobby(idMap: LobbyIdMap): TrainingInstanceLobby {
        return {
            teams: Object.values(idMap.teams).concat(idMap.lockedTeams),
            usersQueue: Object.values(idMap.queue),
        };
    }

    /**
     * Fetch all started teams
     * @return Observable of all started teams
     */
    public loadLobby(): Observable<void> {
        this.loadingSubject.next(true);
        const notifier = new Subject<void>();

        /*this.idMapSubject.next({
            teams: {},
            queue: [...Array(8).keys()].map((num) => ({
                id: num,
                name: 'Player ' + num,
                login: '' + num,
                mail: undefined,
                picture: '',
            })),
        });*/

        this.lobbyApi
            .getInstanceLobby(this.trainingInstanceId)
            .pipe(take(1))
            .subscribe((data) => {
                const idMap: LobbyIdMap = {
                    teams: {},
                    lockedTeams: [],
                    queue: [],
                };
                data.teams.forEach((team: Team) => {
                    if (team.locked) {
                        idMap.lockedTeams = idMap.lockedTeams.concat([team]);
                    } else {
                        idMap.teams[team.id] = team;
                    }
                });
                data.usersQueue.forEach((user: TrainingUser) => (idMap.queue[user.id] = user));
                this.idMapSubject.next(idMap);
                this.loadingSubject.next(false);
                notifier.next();
            });
        return notifier.asObservable();
    }

    /**
     * Create a new team
     * @param name optional parameter for the team name
     * @param members optional parameter for the team members
     * @return Observable of the created team
     */
    public createTeam(name?: string, members?: UserId[]): Observable<void> {
        const lobbyIdMap = this.idMapSubject.value;
        const newTeam = new Team();
        const handle = uuid.v4();
        newTeam.name = !!name ? name : this.generateTeamName();
        newTeam.members = this.removeFromQueue(lobbyIdMap, members || []);

        console.assert(newTeam.members.length <= this.maxTeamSize, this.teamSizeWarning(undefined));
        newTeam.locked = false;
        lobbyIdMap.teams[handle] = newTeam;
        this.idMapSubject.next(lobbyIdMap);
        const notifier = new Subject<void>();
        this.lobbyApi
            .createTeam(this.trainingInstanceId, newTeam.name)
            .pipe(
                takeUntil(this.errorNotifier$),
                take(1),
                switchMap((serverTeam: Team) => this.updateCreatedTeamByHandle(lobbyIdMap, serverTeam, handle)),
                concatMap((serverTeam) => {
                    if (newTeam.members && newTeam.members.length > 0) {
                        return this.lobbyApi.transferPlayersToTeams(
                            this.trainingInstanceId,
                            newTeam.members.map((user) => ({ teamId: serverTeam.id, userId: user.id })),
                        );
                    } else {
                        return of(serverTeam);
                    }
                }),
                catchError((err) => this.handleError(err)),
            )
            .subscribe(() => notifier.next());
        return notifier.asObservable();
    }

    /**
     * Change the team name
     * @param id team id
     * @param name new team name
     * @return Observable of the renamed team
     */
    public renameTeam(id: TeamId, name: string): Observable<void> {
        this.updateTeamById(id, { name });
        const notifier = new Subject<void>();
        this.lobbyApi
            .renameTeam(id, name)
            .pipe(
                takeUntil(this.errorNotifier$),
                take(1),
                catchError((err) => this.handleError(err)),
            )
            .subscribe((newName) => {
                const lobby = this.idMapSubject.value;
                lobby.teams[id].name = newName;
                this.idMapSubject.next(lobby);
                notifier.next();
            });
        return notifier.asObservable();
    }

    /**
     * Return players to the queue from prepared team and
     * delete the team
     * @param id team id
     * @return Observable of new queue state
     */
    public disbandTeam(id: TeamId): Observable<void> {
        const lobbyIdMap = this.idMapSubject.value;
        const team = lobbyIdMap.teams[id];
        team.members.forEach((user: TrainingUser) => (lobbyIdMap.queue[user.id] = user));
        delete lobbyIdMap.teams[id];
        this.idMapSubject.next(lobbyIdMap);
        const notifier = new Subject<void>();
        this.lobbyApi
            .disbandTeam(id)
            .pipe(
                takeUntil(this.errorNotifier$),
                take(1),
                catchError((err) => this.handleError(err)),
            )
            .subscribe(() => notifier.next());
        return notifier.asObservable();
    }

    /**
     * Lock team
     * Locked teams can join the training once the instance starts
     * @param id
     */
    public lockTeam(id: number): Observable<void> {
        const lobbyIdMap = this.idMapSubject.value;
        lobbyIdMap.teams[id].locked = true;
        lobbyIdMap.lockedTeams = lobbyIdMap.lockedTeams.concat([lobbyIdMap.teams[id]]);
        delete lobbyIdMap.teams[id];
        this.idMapSubject.next(lobbyIdMap);
        const notifier = new Subject<void>();
        this.lobbyApi
            .lockTeam(id)
            .pipe(
                takeUntil(this.errorNotifier$),
                take(1),
                catchError((err) => this.handleError(err)),
            )
            .subscribe(() => notifier.next());
        return notifier.asObservable();
    }

    /**
     * Assign players to a team
     * @param players player ids to assign
     * @param teamId team id to assign to
     * @return Observable of new queue state
     */
    public assignToTeam(players: UserId[], teamId: TeamId): Observable<void> {
        const lobbyIdMap = this.idMapSubject.value;
        const team = lobbyIdMap.teams[teamId];
        team.members = team.members.concat(this.removeFromQueue(lobbyIdMap, players));
        console.assert(team.members.length <= this.maxTeamSize, this.teamSizeWarning(teamId));
        this.idMapSubject.next(lobbyIdMap);
        const notifier = new Subject<void>();
        this.lobbyApi
            .transferPlayersToTeams(
                this.trainingInstanceId,
                players.map((userId) => ({ teamId: teamId, userId })),
            )
            .pipe(
                takeUntil(this.errorNotifier$),
                take(1),
                catchError((err) => this.handleError(err)),
            )
            .subscribe(() => notifier.next());
        return notifier.asObservable();
    }

    /**
     * Return players to the queue from prepared teams
     * @return Observable of new queue state
     * @param removalRecord
     */
    public returnToQueue(removalRecord: { teamId: TeamId; users: UserId[] }[]): Observable<void> {
        const lobbyIdMap = this.idMapSubject.value;
        removalRecord.forEach((record) => {
            const [toRemove, toStay] = ArrayHelper.split(lobbyIdMap.teams[record.teamId].members, (member) =>
                record.users.includes(member.id),
            );
            lobbyIdMap.teams[record.teamId].members = toStay;
            toRemove.forEach((user) => (lobbyIdMap.queue[user.id] = user));
        });

        this.idMapSubject.next(lobbyIdMap);
        const notifier = new Subject<void>();
        this.lobbyApi
            .transferPlayersToQueue(
                this.trainingInstanceId,
                ArrayHelper.flatten(
                    removalRecord.map((record) => record.users.map((userId) => ({ teamId: record.teamId, userId }))),
                ),
            )
            .pipe(
                takeUntil(this.errorNotifier$),
                take(1),
                catchError((err) => this.handleError(err)),
            )
            .subscribe(() => notifier.next());
        return notifier.asObservable();
    }

    /**
     * Assign players to teams automatically
     * @param players to assign
     * @return Observable of new queue state
     */
    public autoAssign(players: UserId[]): Observable<void> {
        const lobbyIdMap = this.idMapSubject.value;
        const freeSpace = Object.values(lobbyIdMap.teams).reduce(
            (sum, team) => sum + (this.maxTeamSize - team.members.length),
            0,
        );
        const movedToExistingIds = players.slice(0, freeSpace);
        const movedToExisting = movedToExistingIds.map((playerId) => lobbyIdMap.queue[playerId]);
        this.removeFromQueue(lobbyIdMap, movedToExistingIds);
        const movedToNew = players.slice(freeSpace);

        console.log('toExisting', movedToExisting);
        console.log('movedToNew', movedToNew);

        let changes: { teamId: number; userId: number }[] = [];
        let assignmentIndex = 0;
        for (const team of Object.values(lobbyIdMap.teams)) {
            if (assignmentIndex >= movedToExisting.length) break;
            const assigned = movedToExisting.slice(
                assignmentIndex,
                assignmentIndex + this.maxTeamSize - team.members.length,
            );
            changes = changes.concat(assigned.map((user) => ({ teamId: team.id, userId: user.id })));
            assignmentIndex += assigned.length;
            team.members = team.members.concat(assigned);
        }
        this.idMapSubject.next(lobbyIdMap);
        const notifier = new Subject<void>();
        this.lobbyApi
            .transferPlayersToTeams(this.trainingInstanceId, changes)
            .pipe(
                takeUntil(this.errorNotifier$),
                take(1),
                catchError((err) => this.handleError(err)),
                concatMap(() =>
                    concat(
                        ArrayHelper.toChunks(movedToNew, this.maxTeamSize).map((chunk) =>
                            this.createTeam(undefined, chunk),
                        ),
                    ),
                ),
            )
            .subscribe(() => notifier.next());
        return notifier.asObservable();
    }

    public moveBetweenTeams(teamFromId: TeamId, teamToId: TeamId, users: UserId[]): Observable<void> {
        const lobbyIdMap = this.idMapSubject.value;
        const teamFrom = lobbyIdMap.teams[teamFromId];
        const teamTo = lobbyIdMap.teams[teamToId];
        const freeSpace = this.maxTeamSize - teamTo.members.length;
        if (freeSpace === 0) {
            return;
        }
        const usersToMove = users.slice(0, freeSpace);
        const [toRemove, toStay] = ArrayHelper.split(teamFrom.members, (member) => usersToMove.includes(member.id));
        teamFrom.members = toStay;
        teamTo.members = teamTo.members.concat(toRemove);
        this.idMapSubject.next(lobbyIdMap);
        const notifier = new Subject<void>();
        this.lobbyApi
            .transferPlayersBetweenTeams(teamFromId, teamToId, usersToMove)
            .pipe(
                takeUntil(this.errorNotifier$),
                take(1),
                catchError((err) => this.handleError(err)),
            )
            .subscribe(() => notifier.next());
        return notifier.asObservable();
    }

    /**
     * Balance teams
     * @return Observable of new prepared teams state
     */
    public balanceTeams(): Observable<void> {
        if (Object.values(this.idMapSubject.value.teams).length === 0) {
            return of(void 0);
        }

        const [balancedTeams, changesMade] = this.balancingAlgorithm(Object.values(this.idMapSubject.value.teams));

        console.log('changes', changesMade);

        const lobbyIdMap = this.idMapSubject.value;
        balancedTeams.forEach((team) => {
            lobbyIdMap.teams[team.id] = team;
        });
        this.idMapSubject.next(lobbyIdMap);

        const notifier = new Subject<void>();

        const observables = ArrayHelper.flatten(
            Object.entries(changesMade).map(([teamFromId, change]) =>
                Object.entries(change).map(([teamToId, movedPlayers]) => {
                    console.log(teamFromId, teamToId, movedPlayers);
                    return this.lobbyApi.transferPlayersBetweenTeams(+teamFromId, +teamToId, movedPlayers).pipe(
                        takeUntil(this.errorNotifier$),
                        take(1),
                        catchError((err) => this.handleError(err)),
                    );
                }),
            ),
        );

        console.log('observables', observables);

        concat(...observables).subscribe(() => notifier.next());

        return notifier.asObservable();
    }

    public isTeamNameValid(newName: string): boolean {
        if (!newName) {
            return false;
        }
        return !Object.values(this.idMapSubject.value.teams).some((team) => team.name === newName);
    }

    private balancingAlgorithm(teams: Team[]): [Team[], { [teamFrom: number]: { [teamTo: number]: number[] } }] {
        const averageTeamSize = Math.floor(
            ArrayHelper.sum(Object.values(this.idMapSubject.value.teams).map((team) => team.members.length)) /
                Object.values(this.idMapSubject.value.teams).length,
        );

        const sizeSortedTeams = Object.values(this.idMapSubject.value.teams).sort(
            (a, b) => a.members.length - b.members.length,
        );

        const moves = {} as { [teamFrom: number]: { [teamTo: number]: number[] } };
        let recipientIndex = 0;
        let donorIndex = sizeSortedTeams.length - 1;

        console.log('teams', sizeSortedTeams);
        while (recipientIndex < donorIndex) {
            console.log('recipientIndex', recipientIndex);
            console.log('donorIndex', donorIndex);
            const recipientTeam = sizeSortedTeams[recipientIndex];
            const donorTeam = sizeSortedTeams[donorIndex];

            const needed = averageTeamSize - recipientTeam.members.length;
            const available = donorTeam.members.length - averageTeamSize;

            const transferCount = Math.min(needed, available);

            if (transferCount > 0) {
                const [toStay, toMove] = ArrayHelper.split(
                    donorTeam.members,
                    (_, index) => index < donorTeam.members.length - transferCount,
                );

                recipientTeam.members = recipientTeam.members.concat(toMove);
                donorTeam.members = toStay;

                const fromId = donorTeam.id;
                const toId = recipientTeam.id;

                if (!moves[fromId]) moves[fromId] = {};
                if (!moves[fromId][toId]) moves[fromId][toId] = [];

                moves[fromId][toId].push(...toMove.map((member) => member.id));
            }

            if (recipientTeam.members.length >= averageTeamSize) {
                recipientIndex++;
            }

            if (donorTeam.members.length <= averageTeamSize) {
                donorIndex--;
            }
        }

        return [teams, moves];
    }

    private handleError(err: any): Observable<never> {
        this.errorNotifier$.next();
        this.loadLobby();
        return throwError(() => err);
    }

    private removeFromQueue(lobby: LobbyIdMap, userIds: UserId[]): TrainingUser[] {
        return userIds.map((id) => {
            const user = lobby.queue[id];
            delete lobby.queue[id];
            return user;
        });
    }

    private updateCreatedTeamByHandle(lobbyIdMap: LobbyIdMap, serverTeam: Team, handle: string): Observable<Team> {
        if (lobbyIdMap.teams[handle]) {
            serverTeam.members = lobbyIdMap.teams[handle].members;
            lobbyIdMap.teams[serverTeam.id] = serverTeam;
            delete lobbyIdMap.teams[handle];
            return of(serverTeam);
        } else {
            return throwError(() => 'Could not update team by handle');
        }
    }

    private updateTeamById(id: number, newTeam: Partial<Team>): void {
        const lobbyIdMap = this.idMapSubject.value;
        const team = this.idMapSubject.value.teams[id];
        Object.keys(newTeam).forEach((key) => (team[key] = newTeam[key]));
        this.idMapSubject.next(lobbyIdMap);
    }

    private generateTeamName(): string {
        let generatedName: string | undefined = undefined;

        do {
            generatedName = this.config.teamNameKeywords.reduce(
                (name, list) => name + ' ' + list[Math.floor(Math.random() * list.length)],
                '',
            );
        } while (!this.isTeamNameValid(generatedName));
        return generatedName;
    }
}
