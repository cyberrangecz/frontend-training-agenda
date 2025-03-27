import { Component, Input, TemplateRef } from '@angular/core';
import { MatCard, MatCardAppearance, MatCardContent, MatCardHeader } from '@angular/material/card';
import { NgTemplateOutlet } from '@angular/common';
import { Team } from '@crczp/training-model';
import { GridListComponent, MatCardNotchTitleComponent, PlayerViewComponent } from '@crczp/training-agenda/internal';

@Component({
    standalone: true,
    selector: 'app-team-overview-component',
    templateUrl: './team-overview.component.html',
    imports: [
        MatCardContent,
        MatCardHeader,
        MatCard,
        NgTemplateOutlet,
        PlayerViewComponent,
        GridListComponent,
        MatCardNotchTitleComponent,
    ],
    styleUrl: './team-overview.component.scss',
})
export class TeamOverviewComponent<T> {
    @Input({ required: true }) team: Team;
    @Input() editMode: boolean = false;
    @Input() disabled: boolean = false;
    @Input() appearance: MatCardAppearance;
    @Input() template: TemplateRef<any>;

    hoveredPlayerId: number | null = null;
    playerTrackBy: (item: any) => any = (item) => item.id;

    hoverStart(id: number) {
        this.hoveredPlayerId = id;
    }

    hoverEnd(id: number) {
        if (this.hoveredPlayerId === id) {
            this.hoveredPlayerId = null;
        }
    }
}
