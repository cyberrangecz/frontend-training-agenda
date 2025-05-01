import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { LimitedScoreboard, Team, TeamMessage } from '@crczp/training-model';
import { User } from '@sentinel/auth';

type ViewType = 'team' | 'chat' | 'scoreboard' | null;

@Component({
    selector: 'crczp-run-side-panel',
    templateUrl: './team-side-panel.component.html',
    styleUrl: './team-side-panel.component.css',
})
export class TeamSidePanelComponent {
    @Input({ required: true }) team: Team;
    @Input({ required: true }) limitedScoreboard: LimitedScoreboard;
    @Input({ required: true }) messages: TeamMessage[];
    @Input() currentUser!: User | null;
    @Output() sendMessage = new EventEmitter<string>();

    selectedView: WritableSignal<ViewType> = signal(null);

    getId: (item: { id: number }) => number = (item) => item.id;

    getTeamPositionStr(): string {
        if (!this.team || !this.limitedScoreboard) {
            return '-';
        }
        const teamEntry = this.limitedScoreboard.scoreboard.find((entry) => entry.team.id === this.team.id);
        if (!teamEntry) {
            return '-';
        }
        return String(teamEntry.position);
    }
}
