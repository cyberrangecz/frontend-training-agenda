import { MatDialog } from '@angular/material/dialog';
import { SentinelConfirmationDialogComponent, SentinelConfirmationDialogConfig } from '@sentinel/components/dialogs';
import { Team, TrainingUser } from '@crczp/training-model';
import { TeamManagementService } from '../services/team-management-service';
import { Component, DestroyRef, HostListener, inject, OnInit } from '@angular/core';
import { comparePlayersByName, compareTeamsById } from './team-util-functions';
import { take } from 'rxjs/operators';
import { QueueSelection } from './selection';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-teams-management',
    templateUrl: './teams-management.component.html',
    styleUrl: './teams-management.component.css',
})
export class TeamsManagementComponent implements OnInit {
    constructor(
        private teamsService: TeamManagementService,
        private matDialog: MatDialog,
    ) {}

    ngOnInit() {
        this.teamsService.init();
    }

    showLockedTeams = false;
    protected queueSelection: QueueSelection = new QueueSelection();
    readonly destroyRef = inject(DestroyRef);

    getId: <T extends { id: number }>(item: T) => number = (item) => item.id;

    compareTeams(a: Team, b: Team) {
        if (a.started !== b.started) {
            return a.started ? -Infinity : Infinity;
        }
        return compareTeamsById(a, b);
    }
    readonly compareUsers = comparePlayersByName;

    private subscribeUntilDestroyed<T>(observable: Observable<T>) {
        observable.pipe(take(1), takeUntilDestroyed(this.destroyRef)).subscribe();
    }

    get preparedTeams(): Team[] {
        return this.teamsService.preparedTeamsSubject.value;
    }

    get startedTeams(): Team[] {
        return this.teamsService.startedTeamsSubject.value;
    }

    get waitingPlayers(): TrainingUser[] {
        return this.teamsService.waitingPlayersSubject.value;
    }

    get maxTeamSize(): number {
        return this.teamsService.maxTeamSizeSubject.value;
    }

    @HostListener('document:keydown.a', ['$event'])
    onAKey($event: KeyboardEvent) {
        this.queueSelection.setSelectedQueueUsers(this.teamsService.waitingPlayersSubject.value);
    }

    @HostListener('document:keydown.shift.a', ['$event'])
    onShiftAKey($event: KeyboardEvent) {
        this.queueSelection.setSelectedQueueUsers([]);
    }

    @HostListener('document:keydown.l', ['$event'])
    onLKKey($event: KeyboardEvent) {
        this.showLockedTeams = !this.showLockedTeams;
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
                this.autoAssign(this.waitingPlayers);
            }
        });
    }

    autoAssign(users: TrainingUser[]) {
        this.subscribeUntilDestroyed(this.teamsService.autoAssign(users.map(this.getId)));
    }

    assignQueueSelectionToTeam(team: Team) {
        const usersWhoFit = this.queueSelection
            .getSelectedUsers()
            .slice(0, this.teamsService.maxTeamSizeSubject.value - team.members.length);
        this.autoAssign(usersWhoFit);
    }

    assignTeamsSelectionToTeam(team: Team) {
        const usersWhoFit = this.queueSelection
            .getTeamsSelectedUsers()
            .slice(0, this.teamsService.maxTeamSizeSubject.value - team.members.length)
            .map(this.getId);
        this.subscribeUntilDestroyed(this.teamsService.assignToTeam(usersWhoFit, team.id));
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

    disbandTeam(team: Team) {
        this.subscribeUntilDestroyed(this.teamsService.disbandTeam(team.id));
    }

    createNewTeamFromQueueSelection() {
        this.subscribeUntilDestroyed(
            this.teamsService.createTeam(
                undefined,
                this.queueSelection.getQueueSelectedUsers().slice(0, this.maxTeamSize).map(this.getId),
            ),
        );
    }

    createNewTeamFromTeamsSelection() {
        this.subscribeUntilDestroyed(
            this.teamsService.createTeam(
                undefined,
                this.queueSelection.getTeamsSelectedUsers().slice(0, this.maxTeamSize).map(this.getId),
            ),
        );
    }

    balanceTeams() {
        this.subscribeUntilDestroyed(this.teamsService.balanceTeams());
    }

    returnToQueue(users: TrainingUser[]) {
        this.subscribeUntilDestroyed(this.teamsService.returnToQueue(users.map(this.getId)));
    }

    createNewTeam() {
        this.subscribeUntilDestroyed(this.teamsService.createTeam());
    }
}
