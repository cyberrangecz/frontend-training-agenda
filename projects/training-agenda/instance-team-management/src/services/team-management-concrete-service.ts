import { Team, TrainingInstanceLobby, TrainingUser } from '@crczp/training-model';
import { BehaviorSubject, concatMap, Observable, of, Subject, takeUntil, throwError } from 'rxjs';
import { TeamManagementService } from './team-management-service';
import { TrainingInstanceLobbyApi } from '@crczp/training-api';
import { catchError, switchMap, take } from 'rxjs/operators';
import * as uuid from 'uuid';
import { TrainingAgendaConfig } from '@crczp/training-agenda';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

type Handle<T> = T & { handle: string };

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

    private readonly lobbySubject = new BehaviorSubject<TrainingInstanceLobby>({ teams: [], usersQueue: [] });
    private readonly loadingSubject = new BehaviorSubject<boolean>(true);

    public readonly lobby$ = this.lobbySubject.asObservable();
    public readonly loadingData$ = this.loadingSubject.asObservable();

    private maxTeamSize: number;
    private trainingInstanceId: number;

    public init(instanceId: number, maxTeamSize: number): void {
        this.trainingInstanceId = instanceId;
        this.maxTeamSize = maxTeamSize;
    }

    public getLobbySnapshot(): TrainingInstanceLobby {
        return this.lobbySubject.value;
    }

    /**
     * Fetch all started teams
     * @return Observable of all started teams
     */
    public loadLobby(): void {
        this.loadingSubject.next(true);
        this.lobbyApi
            .getInstanceLobby(this.trainingInstanceId)
            .pipe(take(1))
            .subscribe((data) => {
                this.lobbySubject.next(data);
                this.loadingSubject.next(false);
            });
    }

    /**
     * Create a new team
     * @param name optional parameter for the team name
     * @param members optional parameter for the team members
     * @return Observable of the created team
     */
    public createTeam(name?: string, members?: TrainingUser['id'][]): void {
        const lobby = this.lobbySubject.value;
        const newTeam = new Team() as Handle<Team>;
        newTeam.handle = uuid.v4();
        newTeam.name = !!name ? name : this.generateTeamName();
        newTeam.members = members ? this.removeFromQueue(lobby, members) : [];
        console.assert(newTeam.members.length <= this.maxTeamSize, this.teamSizeWarning(undefined));
        newTeam.locked = false;
        lobby.teams.push(newTeam);
        this.lobbySubject.next(lobby);

        this.lobbyApi
            .createTeam(this.trainingInstanceId, newTeam.name)
            .pipe(
                takeUntil(this.errorNotifier$),
                take(1),
                switchMap((serverTeam: Team) => this.updateTeamByHandle(lobby, serverTeam, newTeam.handle)),
                concatMap((serverTeam) => {
                    if (newTeam.members && newTeam.members.length > 0) {
                        return this.lobbyApi.transferPlayersToTeams(
                            this.trainingInstanceId,
                            members.map((userId) => ({ teamId: serverTeam.id, userId })),
                        );
                    } else {
                        return of(serverTeam);
                    }
                }),
                catchError((err) => this.handleError(err)),
            )
            .subscribe();
    }

    /**
     * Change the team name
     * @param id team id
     * @param name new team name
     * @return Observable of the renamed team
     */
    public renameTeam(id: Team['id'], name: string): void {
        this.updateTeamById(id, { name });
        this.lobbyApi
            .renameTeam(id, name)
            .pipe(
                takeUntil(this.errorNotifier$),
                take(1),
                catchError((err) => this.handleError(err)),
            )
            .subscribe((renamedTeam) => this.updateTeamById(id, renamedTeam));
    }

    /**
     * Return players to the queue from prepared team and
     * delete the team
     * @param id team id
     * @return Observable of new queue state
     */
    public disbandTeam(id: Team['id']): void {
        const lobby = this.lobbySubject.value;
        const team = this.findOrThrow(lobby.teams, id);
        lobby.teams = lobby.teams.filter((team) => team.id !== id);
        lobby.usersQueue = lobby.usersQueue.concat(team.members);
        this.lobbySubject.next(lobby);
        this.lobbyApi
            .disbandTeam(id)
            .pipe(
                takeUntil(this.errorNotifier$),
                take(1),
                catchError((err) => this.handleError(err)),
            )
            .subscribe();
    }

    /**
     * Assign players to a team
     * @param players player ids to assign
     * @param teamId team id to assign to
     * @return Observable of new queue state
     */
    public assignToTeam(players: TrainingUser['id'][], teamId: Team['id']): void {
        console.log('Assigning players', players);
        const lobby = this.lobbySubject.value;
        const team = this.findOrThrow(lobby.teams, teamId);
        team.members = team.members.concat(this.removeFromQueue(lobby, players));
        console.assert(team.members.length <= this.maxTeamSize, this.teamSizeWarning(teamId));
        this.lobbySubject.next(lobby);
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
            .subscribe();
    }

    /**
     * Return players to the queue from prepared teams
     * @param players player ids to return
     * @return Observable of new queue state
     */
    public returnToQueue(players: TrainingUser['id'][]): void {
        const lobby = this.lobbySubject.value;
        let toRemove = players;
        const removalRecord = this.flatten(
            lobby.teams.map((team: Team) => {
                const [toQueue, toKeep] = this.splitArray(team.members, (member) => toRemove.includes(member.id));
                team.members = toKeep;
                lobby.usersQueue = lobby.usersQueue.concat(toQueue);
                return toQueue.map((user) => ({ teamId: team.id, userId: user.id }));
            }),
        );
        this.lobbySubject.next(lobby);
        this.lobbyApi
            .transferPlayersToQueue(this.trainingInstanceId, removalRecord)
            .pipe(
                takeUntil(this.errorNotifier$),
                take(1),
                catchError((err) => this.handleError(err)),
            )
            .subscribe();
    }

    /**
     * Assign players to teams automatically
     * @param players to assign
     * @return Observable of new queue state
     */
    public autoAssign(players: TrainingUser['id'][]): void {
        const lobby = this.lobbySubject.value;
        const [toMove, queue] = this.splitArray(lobby.usersQueue, (user) => players.includes(user.id));
        lobby.usersQueue = queue;

        const freeSpace = lobby.teams.reduce((sum, team) => sum + (this.maxTeamSize - team.members.length), 0);
        const toAssignToExistingIds = players.slice(0, freeSpace);
        const [toExisting, toNew] = this.splitArray(toMove, (user) => toAssignToExistingIds.includes(user.id));
        let assignmentIndex = 0;
        let changes: { teamId: number; userId: number }[] = [];
        for (const team of lobby.teams) {
            if (assignmentIndex >= toExisting.length) {
                break;
            }
            const assigned = toExisting.slice(assignmentIndex, this.maxTeamSize - team.members.length);
            changes = changes.concat(assigned.map((user) => ({ teamId: team.id, userId: user.id })));
            assignmentIndex += assigned.length;
            team.members = team.members.concat(assigned);
        }
        this.lobbySubject.next(lobby);
        this.lobbyApi
            .transferPlayersToTeams(this.trainingInstanceId, changes)
            .pipe(
                takeUntil(this.errorNotifier$),
                take(1),
                catchError((err) => this.handleError(err)),
            )
            .subscribe();
    }

    /**
     * Balance teams
     * @return Observable of new prepared teams state
     */
    public balanceTeams(): void {
        return;
    }

    private handleError(err: any): Observable<never> {
        this.errorNotifier$.next();
        this.loadLobby();
        return throwError(() => err);
    }

    private removeFromQueue(lobby: TrainingInstanceLobby, userIds: TrainingUser['id'][]): TrainingUser[] {
        const [toRemove, toStay] = this.splitArray(lobby.usersQueue, (user) => userIds.some((id) => id === user.id));
        lobby.usersQueue = toStay;
        return toRemove;
    }

    private splitArray<T>(arr: T[], condition: (elem: T) => boolean): [T[], T[]] {
        return arr.reduce(
            ([condTrue, condFalse], item) => {
                (condition(item) ? condTrue : condFalse).push(item);
                return [condTrue, condFalse];
            },
            [[], []],
        );
    }

    private findOrThrow<T extends { id: number }>(items: T[], id: number): T {
        const item = items.find((elem) => elem.id === id);
        if (!item) {
            throw new Error(`Item with id ${id} not found`);
        }
        return item;
    }

    private updateTeamByHandle(lobby: TrainingInstanceLobby, createdTeam: Team, handle: string): Observable<Team> {
        const team = lobby.teams.find((team: unknown) => team['handle'] && team['handle'] === handle);
        if (!!team) {
            team.members = createdTeam.members;
            team.name = createdTeam.name;
            team.locked = createdTeam.locked;
            return of(team);
        } else {
            return throwError(() => 'Could not update team by handle');
        }
    }

    private updateTeamById(id: number, newTeam: Partial<Team>): void {
        const lobby = this.lobbySubject.value;
        const team = this.findOrThrow(lobby.teams, id);
        Object.keys(newTeam).forEach((key) => (team[key] = newTeam[key]));
        this.lobbySubject.next(lobby);
    }

    private flatten<T>(arr: T[][]): T[] {
        return arr.reduce((reduced, next) => reduced.concat(next), []);
    }

    private generateTeamName(): string {
        let generatedName: string | undefined = undefined;

        const takenNames = this.lobbySubject.value.teams.reduce(
            (dict, team) => {
                dict[team.name] = true;
                return dict;
            },
            {} as { [key: string]: true },
        );
        do {
            generatedName = this.config.teamNameKeywords.reduce(
                (name, list) => name + ' ' + list[Math.floor(Math.random() * list.length)],
                '',
            );
        } while (takenNames[generatedName] !== undefined);

        console.log('Generated name', generatedName);
        return generatedName;
    }
}
