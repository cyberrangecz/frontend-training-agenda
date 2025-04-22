import { Component, Input, OnInit } from '@angular/core';
import { TeamInfo } from '@crczp/training-model';

@Component({
    selector: 'crczp-team-side-panel',
    templateUrl: './team-side-panel.component.html',
    styleUrl: './team-side-panel.component.css',
})
export class TeamSidePanelComponent {
    @Input({ required: true }) teamInfo: TeamInfo;
}
