import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Team, User } from '../../model/team';
import { MatCard, MatCardAppearance, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { PlayerViewComponent } from '../player-view/player-view.component';
import { SortedSelectionList } from '../../util/sorted-selection-list';
import { comparePlayersByTimeJoined } from '../../util/teamUtilFunctions';
import { NgTemplateOutlet } from '@angular/common';
import { GridListComponent } from '../grid-list/grid-list.component';
import { MatCardNotchTitleComponent } from '../mat-card-notch-title/mat-card-notch-title.component';

@Component({
    standalone: true,
    selector: 'app-team-overview-component',
    templateUrl: './team-overview.component.html',
    imports: [
        MatCardContent,
        MatGridList,
        MatGridTile,
        MatCardTitle,
        MatCardHeader,
        MatCard,
        PlayerViewComponent,
        NgTemplateOutlet,
        GridListComponent,
        MatCardNotchTitleComponent,
    ],
    styleUrl: './team-overview.component.scss',
})
export class TeamOverviewComponent<T> implements OnInit {
    @Input({ required: true }) team: Team;
    @Input() editMode: boolean = false;
    @Input() disabled: boolean = false;
    @Input() appearance: MatCardAppearance;
    @Input() template: TemplateRef<any>;

    teamMembers: SortedSelectionList<User, number>;

    hoveredPlayerId: number | null = null;
    playerTrackBy: (item: any) => any = (item) => item.id;

    ngOnInit() {
        this.teamMembers = new SortedSelectionList(
            this.team.members,
            comparePlayersByTimeJoined,
            (member) => member.id,
        );
    }

    hoverStart(id: number) {
        this.hoveredPlayerId = id;
    }

    hoverEnd(id: number) {
        if (this.hoveredPlayerId === id) {
            this.hoveredPlayerId = null;
        }
    }
}
