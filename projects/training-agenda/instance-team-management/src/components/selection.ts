import { Team, TrainingUser } from '@crczp/training-model';

export class QueueSelection {
    private queueSelection: TrainingUser[] = [];
    private intervalSelectedUsers: { inverted: boolean; items: TrainingUser[] } = { inverted: false, items: [] };

    isInSelectionInterval(TrainingUser: TrainingUser): boolean {
        return this.intervalSelectedUsers.items.includes(TrainingUser);
    }

    isIntervalSelectionInverted() {
        return this.intervalSelectedUsers.inverted;
    }

    setSelectedQueueUsers(selectedQueueUsers: TrainingUser[]) {
        this.queueSelection = selectedQueueUsers;
        this.teamsSelection = [];
    }

    removeUsersFromQueueSelection(users: TrainingUser[]) {
        this.queueSelection = this.queueSelection.filter((TrainingUser) => !users.includes(TrainingUser));
    }

    private teamsSelection: TrainingUser[] = [];

    setSelectedTeamsUsers(users: TrainingUser[]) {
        this.queueSelection = [];
        this.teamsSelection = users;
    }

    teamSelectionChange(team: Team, users: TrainingUser[]) {
        this.teamsSelection = this.teamsSelection.concat(users);
        this.removeUsersFromTeamsSelection(
            team.members.filter((member) => users.some((TrainingUser) => TrainingUser.id === member.id)),
        );
    }

    removeUsersFromTeamsSelection(users: TrainingUser[]) {
        this.teamsSelection = this.teamsSelection.filter((TrainingUser) => !users.includes(TrainingUser));
    }

    isQueueSelected(TrainingUser: TrainingUser): boolean {
        return this.queueSelection.some((selectedUser) => selectedUser.id === TrainingUser.id);
    }

    isTeamsSelected(TrainingUser: TrainingUser): boolean {
        return this.teamsSelection.some((selectedUser) => selectedUser.id === TrainingUser.id);
    }

    isSelected(TrainingUser: TrainingUser) {
        return this.isQueueSelected(TrainingUser) || this.isTeamsSelected(TrainingUser);
    }

    getSelectedUsers(): TrainingUser[] {
        return this.getQueueSelectedUsers().concat(this.getTeamsSelectedUsers());
    }

    getQueueSelectedUsers(): TrainingUser[] {
        return this.queueSelection;
    }

    getTeamsSelectedUsers(): TrainingUser[] {
        return new Array(...this.teamsSelection.values()).flat();
    }
}
