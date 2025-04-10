import { MatDialog } from '@angular/material/dialog';
import { SentinelConfirmationDialogComponent, SentinelConfirmationDialogConfig } from '@sentinel/components/dialogs';
import { Team, TrainingInstance, TrainingUser } from '@crczp/training-model';
import { TeamManagementService } from '../services/team-management-service';
import { ChangeDetectionStrategy, Component, DestroyRef, HostListener, inject, OnInit, signal } from '@angular/core';
import { comparePlayersByName, compareTeamsById } from './team-util-functions';
import { QueueSelection } from './queue-selection';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME } from '@crczp/training-agenda';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, take, tap } from 'rxjs/operators';

@Component({
    selector: 'crczp-teams-management',
    templateUrl: './teams-management.component.html',
    styleUrl: './teams-management.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsManagementComponent implements OnInit {
    constructor(
        protected teamsService: TeamManagementService,
        private matDialog: MatDialog,
        private activeRoute: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.activeRoute.data
            .pipe(
                take(1),
                takeUntilDestroyed(this.destroyRef),
                map((data) => data[TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]),
            )
            .subscribe((data) => {
                this.trainingInstance = data;
                this.teamsService.init(data.id, data.maxTeamSize);
                this.teamsService.loadLobby();
            });
    }

    showLockedTeams = signal(false);
    queueSelection = new QueueSelection();
    readonly destroyRef = inject(DestroyRef);

    protected trainingInstance: TrainingInstance;

    getId: <T extends { id: number }>(item: T) => number = (item) => item.id;

    compareTeams(a: Team, b: Team) {
        if (a.locked !== b.locked) {
            return a.locked ? -Infinity : Infinity;
        }
        return compareTeamsById(a, b);
    }

    readonly compareUsers = comparePlayersByName;

    teamNameFilterSubject = new BehaviorSubject('');
    playerNameFilterSubject = new BehaviorSubject('');

    preparedTeamsCountSubject = new BehaviorSubject(0);
    lockedTeamsCountSubject = new BehaviorSubject(0);

    get preparedTeams$(): Observable<Team[]> {
        return combineLatest([
            this.teamsService.lobby$.pipe(
                map((lobby) => lobby.teams.filter((team) => !team.locked)),
                tap((teams) => this.preparedTeamsCountSubject.next(teams.length)),
            ),
            this.teamNameFilterSubject.asObservable(),
        ]).pipe(
            takeUntilDestroyed(this.destroyRef),
            map(([teams, filter]) =>
                teams.filter((t) => t.name.toLowerCase().includes(filter.toLowerCase())).sort(this.compareTeams),
            ),
        );
    }

    get lockedTeams$(): Observable<Team[]> {
        return combineLatest([
            this.teamsService.lobby$.pipe(
                map((lobby) => lobby.teams.filter((team) => team.locked)),
                tap((teams) => this.lockedTeamsCountSubject.next(teams.length)),
            ),
            this.teamNameFilterSubject.asObservable(),
        ]).pipe(
            takeUntilDestroyed(this.destroyRef),
            map(([teams, filter]) =>
                teams.filter((t) => t.name.toLowerCase().includes(filter.toLowerCase())).sort(this.compareTeams),
            ),
        );
    }

    waitingPlayersCountSubject = new BehaviorSubject(0);
    filteredPlayersSubject = new BehaviorSubject([] as TrainingUser[]);

    get waitingPlayers$(): Observable<TrainingUser[]> {
        return combineLatest([
            this.teamsService.lobby$.pipe(
                map((queue) => queue.usersQueue),
                tap((queue) => this.waitingPlayersCountSubject.next(queue.length)),
            ),
            this.playerNameFilterSubject.asObservable(),
        ]).pipe(
            takeUntilDestroyed(this.destroyRef),
            map(([players, filter]) =>
                players.filter((t) => t.name.toLowerCase().includes(filter.toLowerCase())).sort(this.compareUsers),
            ),
            tap((queue) => this.filteredPlayersSubject.next(queue)),
        );
    }

    @HostListener('document:keydown.a', ['$event'])
    onAKey($event: KeyboardEvent) {
        this.queueSelection.setSelectedQueueUsers(this.filteredPlayersSubject.value);
    }

    @HostListener('document:keydown.shift.a', ['$event'])
    onShiftAKey($event: KeyboardEvent) {
        this.queueSelection.deselectAllQueueUsers();
    }

    @HostListener('document:keydown.l', ['$event'])
    onLKKey($event: KeyboardEvent) {
        this.showLockedTeams.set(!this.showLockedTeams());
    }

    @HostListener('document:keydown.b', ['$event'])
    onBKey($event: KeyboardEvent) {
        this.balanceTeams();
    }

    autoAssignAll() {
        const dialogRef = this.matDialog.open(SentinelConfirmationDialogComponent, {
            data: new SentinelConfirmationDialogConfig(
                'Auto-Assign',
                'Do you want to auto-assign all users to teams? New teams will be created as needed.',
                'Cancel',
                'Auto-Assign',
            ),
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this.queueSelection.setSelectedQueueUsers(this.filteredPlayersSubject.value);
                this.autoAssignQueueSelection();
            }
        });
        this.queueSelection.deselectAllQueueUsers();
        this.queueSelection.deselectAllTeamsUsers();
    }

    autoAssignQueueSelection() {
        this.teamsService.autoAssign(this.queueSelection.selectedQueueUsers.map(this.getId));
        this.queueSelection.deselectAllQueueUsers();
    }

    moveSelectedFromQueueToTeam(team: Team) {
        const movedUsers = this.queueSelection.selectedQueueUsers.slice(
            0,
            this.trainingInstance.maxTeamSize - team.members.length,
        );
        this.teamsService.assignToTeam(movedUsers.map(this.getId), team.id);
        this.queueSelection.deselectAllQueueUsers();
    }

    moveSelectedUsersBetweenTeams(teamTo: Team) {
        let freeSpace = this.trainingInstance.maxTeamSize - teamTo.members.length;

        Object.entries(this.queueSelection.selectedTeamsUsersDictionary).forEach(([teamFromId, users]) => {
            const movedUsers = users.slice(users.length - freeSpace, users.length);
            if (movedUsers.length === 0) return;
            freeSpace -= movedUsers.length;
            this.queueSelection.setSelectedTeamsUsers(
                +teamFromId,
                this.queueSelection
                    .getSelectionForTeam(+teamFromId)
                    .filter((user) => !movedUsers.some((movedUser) => movedUser.id === user.id)),
            );
            this.teamsService.moveBetweenTeams(+teamFromId, teamTo.id, movedUsers.map(this.getId));
        });
    }

    disbandTeam(teamId: number) {
        this.teamsService.disbandTeam(teamId);
        this.queueSelection.setSelectedTeamsUsers(teamId, []);
    }

    createNewTeamFromQueueSelection() {
        const toMove = this.queueSelection.selectedQueueUsers.slice(0, this.trainingInstance.maxTeamSize);
        this.queueSelection.deselect(toMove);
        this.teamsService.createTeam(undefined, toMove.map(this.getId));
    }

    balanceTeams() {
        this.teamsService.balanceTeams();
    }

    returnSelectionToQueue() {
        const teamsSelection = this.queueSelection.selectedTeamsUsersDictionary;
        this.teamsService.returnToQueue(
            Object.entries(teamsSelection).map(([key, value]) => ({
                teamId: +key,
                users: value.map(this.getId),
            })),
        );
        this.queueSelection.deselectFromTeams(this.queueSelection.selectedTeamsUsers);
    }

    createNewTeam() {
        this.teamsService.createTeam();
    }

    filterTeams(filter: string) {
        this.queueSelection.deselectAllTeamsUsers();
        this.teamNameFilterSubject.next(filter);
    }

    filterQueue(filter: string) {
        this.queueSelection.deselectAllQueueUsers();
        this.playerNameFilterSubject.next(filter);
    }

    teamNameErrors = signal<Map<number, string>>(new Map());

    renameTeam(id: number, newName: string) {
        console.log(id, newName);
        newName = newName.trim();
        if (newName.length === 0) {
            this.teamNameErrors.set(this.teamNameErrors().set(id, 'Team name cannot be blank'));
            return;
        }
        if (!this.teamsService.isTeamNameValid(newName)) {
            this.teamNameErrors.set(this.teamNameErrors().set(id, 'This name is already taken.'));
            return;
        }
        this.teamsService.renameTeam(id, newName);
    }

    getError(id: number): string | undefined {
        return this.teamNameErrors().get(id);
    }

    lockTeam(id: number) {
        this.teamsService.lockTeam(id);
    }

    getPlayersCountLabel() {
        return this.queueSelection.selectedQueueUsers.length > 0
            ? 'Selected ' + this.queueSelection.selectedQueueUsers.length + '/' + this.waitingPlayersCountSubject.value
            : this.waitingPlayersCountSubject.value !== 1
              ? this.waitingPlayersCountSubject.value + ' players queued'
              : '1 player queued';
    }

    getTeamsCountLabel() {
        return this.showLockedTeams()
            ? this.preparedTeamsCountSubject.value +
                  ' unlocked ' +
                  ' / ' +
                  +this.preparedTeamsCountSubject.value +
                  +this.lockedTeamsCountSubject.value +
                  ' total teams'
            : this.preparedTeamsCountSubject.value !== 1
              ? this.preparedTeamsCountSubject.value + ' unlocked teams'
              : '1 unlocked team';
    }
}
