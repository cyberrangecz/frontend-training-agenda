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

    isInSelectionInterval(user: TrainingUser): boolean {
        return this.intervalSelectedUsersSignal().items.includes(user);
    }

    isIntervalSelectionInverted() {
        return this.intervalSelectedUsersSignal().inverted;
    }

    removeUsersFromQueueSelection(users: TrainingUser[]) {
        this.selectedQueueUsers = this.selectedQueueUsers.filter((user) => !users.includes(user));
    }

    teamSelectionChange(team: Team, users: TrainingUser[]) {
        this.selectedTeamsUsers = users;
    }

    removeUsersFromTeamsSelection(users: TrainingUser[]) {
        this.selectedTeamsUsers = this.selectedTeamsUsers.filter((user) => !users.includes(user));
    }

    isQueueSelected(user: TrainingUser): boolean {
        return this.selectedQueueUsers.some((selectedUser) => selectedUser.id === user.id);
    }

    isTeamsSelected(user: TrainingUser): boolean {
        return this.selectedTeamsUsers.some((selectedUser) => selectedUser.id == user.id);
    }

    isSelected(user: TrainingUser) {
        return this.isQueueSelected(user) || this.isTeamsSelected(user);
    }

    getSelectedUsers(): TrainingUser[] {
        return this.selectedQueueUsers.concat(this.selectedTeamsUsers);
    }

    deselect(users: TrainingUser[]) {
        this.queueSelectionSignal.set(this.queueSelectionSignal().filter((user) => !users.includes(user)));
        this.teamsSelectionSignal.set(this.teamsSelectionSignal().filter((user) => !users.includes(user)));
    }
}
