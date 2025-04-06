import { Team, TrainingUser } from '@crczp/training-model';
import { signal } from '@angular/core';
import { SelectionInterval } from '@crczp/training-agenda/internal';

export class QueueSelection {
    queueSelectionSignal = signal<TrainingUser[]>([]);
    teamsSelectionSignal = signal<TrainingUser[]>([]);

    private intervalSelectedUsersSignal = signal<SelectionInterval<TrainingUser>>({ inverted: false, items: [] });

    set intervalSelectedUsers(interval: SelectionInterval<TrainingUser>) {
        this.intervalSelectedUsersSignal.set(interval);
    }

    set selectedQueueUsers(selectedQueueUsers: TrainingUser[]) {
        this.queueSelectionSignal.set(selectedQueueUsers);
        this.teamsSelectionSignal.set([]);
    }

    set selectedTeamsUsers(selectedTeams: TrainingUser[]) {
        this.teamsSelectionSignal.set(selectedTeams);
        this.queueSelectionSignal.set([]);
    }

    get selectedQueueUsers(): TrainingUser[] {
        return this.queueSelectionSignal();
    }

    get selectedTeamsUsers(): TrainingUser[] {
        return this.teamsSelectionSignal();
    }

    isInSelectionInterval(TrainingUser: TrainingUser): boolean {
        return this.intervalSelectedUsersSignal().items.includes(TrainingUser);
    }

    isIntervalSelectionInverted() {
        return this.intervalSelectedUsersSignal().inverted;
    }

    removeUsersFromQueueSelection(users: TrainingUser[]) {
        this.selectedQueueUsers = this.selectedQueueUsers.filter((TrainingUser) => !users.includes(TrainingUser));
    }

    teamSelectionChange(team: Team, users: TrainingUser[]) {
        this.selectedTeamsUsers = this.selectedTeamsUsers.concat(users);
        this.removeUsersFromTeamsSelection(
            team.members.filter((member) => users.some((TrainingUser) => TrainingUser.id === member.id)),
        );
    }

    removeUsersFromTeamsSelection(users: TrainingUser[]) {
        this.selectedTeamsUsers = this.selectedTeamsUsers.filter((TrainingUser) => !users.includes(TrainingUser));
    }

    isQueueSelected(TrainingUser: TrainingUser): boolean {
        return this.selectedTeamsUsers.some((selectedUser) => selectedUser.id === TrainingUser.id);
    }

    isTeamsSelected(TrainingUser: TrainingUser): boolean {
        return this.selectedTeamsUsers.some((selectedUser) => selectedUser.id === TrainingUser.id);
    }

    isSelected(TrainingUser: TrainingUser) {
        return this.isQueueSelected(TrainingUser) || this.isTeamsSelected(TrainingUser);
    }

    getSelectedUsers(): TrainingUser[] {
        return this.selectedQueueUsers.concat(this.selectedTeamsUsers);
    }
}
