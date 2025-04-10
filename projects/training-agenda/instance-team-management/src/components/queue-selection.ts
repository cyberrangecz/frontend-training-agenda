import { TrainingUser } from '@crczp/training-model';
import { signal } from '@angular/core';
import { SelectionInterval } from '@crczp/training-agenda/internal';
import { ArrayHelper } from '../../../internal/src/utils/array-helper';

export class QueueSelection {
    private queueSelectionSignal = signal<TrainingUser[]>([]);
    private teamsSelectionSignal = signal<{ [key: number]: TrainingUser[] }>({});

    private intervalSelectedUsersSignal = signal<SelectionInterval<TrainingUser>>({ inverted: false, items: [] });

    set intervalSelectedUsers(interval: SelectionInterval<TrainingUser>) {
        this.intervalSelectedUsersSignal.set(interval);
    }

    setSelectedQueueUsers(selectedQueueUsers: TrainingUser[]) {
        this.queueSelectionSignal.set(selectedQueueUsers);
        this.teamsSelectionSignal.set([]);
        this.cancelIntervalSelection();
    }

    setSelectedTeamsUsers(teamId: number, members: TrainingUser[]) {
        this.teamsSelectionSignal.update((selection) => {
            selection[teamId] = members;
            return selection;
        });
        this.queueSelectionSignal.set([]);
        this.cancelIntervalSelection();
    }

    get selectedQueueUsers(): TrainingUser[] {
        return this.queueSelectionSignal();
    }

    get selectedTeamsUsers(): TrainingUser[] {
        return ArrayHelper.flatten(Object.values(this.teamsSelectionSignal()));
    }

    get selectedTeamsUsersDictionary(): { [key: number]: TrainingUser[] } {
        return this.teamsSelectionSignal();
    }

    getSelectionForTeam(id: number): TrainingUser[] {
        return id in this.teamsSelectionSignal() ? this.teamsSelectionSignal()[id] : [];
    }

    isInSelectionInterval(user: TrainingUser): boolean {
        return this.intervalSelectedUsersSignal().items.includes(user);
    }

    isIntervalSelectionInverted() {
        return this.intervalSelectedUsersSignal().inverted;
    }

    cancelIntervalSelection() {
        this.intervalSelectedUsers = { inverted: false, items: [] };
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

    deselectFromQueue(users: TrainingUser[]) {
        this.setSelectedQueueUsers(this.selectedQueueUsers.filter((user) => !users.includes(user)));
        this.cancelIntervalSelection();
    }

    deselectFromTeams(users: TrainingUser[]) {
        this.teamsSelectionSignal.update((teamsSelection) => {
            Object.entries(teamsSelection).forEach(
                ([key, value]) =>
                    (teamsSelection[key] = value.filter((member) => !users.some((user) => member.id === user.id))),
            );
            return teamsSelection;
        });
        this.cancelIntervalSelection();
    }

    deselect(users: TrainingUser[]) {
        this.deselectFromQueue(users);
        this.deselectFromTeams(users);
        this.cancelIntervalSelection();
    }

    deselectAllQueueUsers() {
        this.setSelectedQueueUsers([]);
    }

    deselectAllTeamsUsers() {
        this.teamsSelectionSignal.set({});
    }
}
