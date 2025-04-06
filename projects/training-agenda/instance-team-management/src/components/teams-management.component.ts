import { MatDialog } from '@angular/material/dialog';
import { SentinelConfirmationDialogComponent, SentinelConfirmationDialogConfig } from '@sentinel/components/dialogs';
import { Team, TrainingInstance, TrainingUser } from '@crczp/training-model';
import { TeamManagementService } from '../services/team-management-service';
import { ChangeDetectionStrategy, Component, DestroyRef, HostListener, inject, OnInit, signal } from '@angular/core';
import { comparePlayersByName, compareTeamsById } from './team-util-functions';
import { QueueSelection } from './queue-selection';
import { filter, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME } from '@crczp/training-agenda';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    queueSelection: QueueSelection = new QueueSelection();
    readonly destroyRef = inject(DestroyRef);

    private trainingInstance: TrainingInstance;

    getId: <T extends { id: number }>(item: T) => number = (item) => item.id;

    compareTeams(a: Team, b: Team) {
        if (a.locked !== b.locked) {
            return a.locked ? -Infinity : Infinity;
        }
        return compareTeamsById(a, b);
    }
    readonly compareUsers = comparePlayersByName;

    get preparedTeams$(): Observable<Team[]> {
        return this.teamsService.lobby$.pipe(map((lobby) => lobby.teams.filter((team) => !team.locked)));
    }

    get lockedTeams$(): Observable<Team[]> {
        return this.teamsService.lobby$.pipe(map((lobby) => lobby.teams.filter((team) => team.locked)));
    }

    get waitingPlayers$(): Observable<TrainingUser[]> {
        return this.teamsService.lobby$.pipe(map((lobby) => lobby.usersQueue));
    }

    @HostListener('document:keydown.a', ['$event'])
    onAKey($event: KeyboardEvent) {
        this.queueSelection.selectedQueueUsers = this.teamsService.getLobbySnapshot().usersQueue;
    }

    @HostListener('document:keydown.shift.a', ['$event'])
    onShiftAKey($event: KeyboardEvent) {
        this.queueSelection.selectedQueueUsers = [];
    }

    @HostListener('document:keydown.l', ['$event'])
    onLKKey($event: KeyboardEvent) {
        this.showLockedTeams.set(!this.showLockedTeams);
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
                this.autoAssign(this.teamsService.getLobbySnapshot().usersQueue);
            }
        });
    }

    autoAssign(users: TrainingUser[]) {
        this.teamsService.autoAssign(users.map(this.getId));
    }

    assignSelectionToTeam(team: Team, selection: TrainingUser[]) {
        console.log('assignSelectionToTeam', team, selection);
        this.teamsService.assignToTeam(
            selection.slice(0, this.trainingInstance.maxTeamSize - team.members.length).map(this.getId),
            team.id,
        );
    }
    disbandTeam(team: Team) {
        this.teamsService.disbandTeam(team.id);
    }

    createNewTeamFromSelection(selection: TrainingUser[]) {
        this.teamsService.createTeam(undefined, selection.slice(0, this.trainingInstance.maxTeamSize).map(this.getId));
    }

    balanceTeams() {
        this.teamsService.balanceTeams();
    }

    returnToQueue(users: TrainingUser[]) {
        this.teamsService.returnToQueue(users.map(this.getId));
    }

    createNewTeam() {
        this.teamsService.createTeam();
    }

    /*
        autoAssign(players: TrainingUser[], createNewTeams: boolean) {
            const freeSlots = this.getUnlockedTeams().reduce(
                (acc, team) => acc + this.maxTeamMembers - team.members.length,
                0,
            );
            const difference = players.length - freeSlots;
            const newTeamsNeeded = Math.ceil(difference / this.maxTeamMembers);
            const newTeams = this.getUnlockedTeams()
                .concat(createNewTeams ? generateTeams(newTeamsNeeded, 0, this.maxTeamMembers, false) : [])
                .sort((a: Team, b: Team) => a.members.length - b.members.length);

            const assignedPlayerIds: number[] = [];
            for (let emptinessLevel = this.maxTeamMembers; emptinessLevel > 0; emptinessLevel--) {
                let teamIndex = 0;
                while (
                    teamIndex < newTeams.length &&
                    players.length > 0 &&
                    this.maxTeamMembers - newTeams[teamIndex].members.length === emptinessLevel
                ) {
                    const movedPlayer = players.pop() as TrainingUser;
                    newTeams[teamIndex].members.push(movedPlayer);
                    assignedPlayerIds.push(movedPlayer.id);
                    teamIndex++;
                }
            }
            (this.queueSelection.length > 0 ? this.setSelectedQueueUsers : this.setSelectedTeamsUsers)(
                this.getSelectedUsers().filter((player) => !assignedPlayerIds.includes(player.id)),
            );
            this.queue = this.queue.filter((player) => !assignedPlayerIds.includes(player.id));
            this.setUnlockedTeams(newTeams);
        }*/
}
