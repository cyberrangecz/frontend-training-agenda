import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridListComponent } from '../grid-list/grid-list.component';
import { MatCard } from '@angular/material/card';
import { ScoreboardEntry } from '@crczp/training-model';
import { ArrayHelper } from '../../utils/array-helper';

@Component({
    selector: 'crczp-teams-scoreboard',
    templateUrl: './teams-scoreboard.component.html',
    styleUrl: './teams-scoreboard.component.css',
    imports: [GridListComponent, MatCard],
    standalone: true,
})
export class TeamsScoreboardComponent implements OnChanges {
    @Input() teamsScores: ScoreboardEntry[];
    @Input() positionsBeforeUserTeam: number;
    @Input() positionsAfterUserTeam: number;
    @Input() usersTeamId: number;

    mappedScoreboard: (ScoreboardEntry | number)[] = [];

    trackByFn = (item: ScoreboardEntry | number) => (typeof item === 'number' ? item : item.team.id);

    private sortByPositionAndName(a: ScoreboardEntry, b: ScoreboardEntry) {
        if (a.position !== b.position) {
            return a.position - b.position;
        }
        return a.team.name.localeCompare(b.team.name);
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('teamsScores' in changes) {
            const [top3, above] = ArrayHelper.split(
                changes['teamsScores'].currentValue,
                (elem: ScoreboardEntry) => elem.position <= 3,
            );
            this.mappedScoreboard = []
                .concat(top3.sort(this.sortByPositionAndName))
                .concat(this.positionsBeforeUserTeam > 0 ? [this.positionsBeforeUserTeam] : [])
                .concat(above.sort(this.sortByPositionAndName))
                .concat(this.positionsAfterUserTeam > 0 ? [this.positionsAfterUserTeam] : []);
        }
    }

    isFiller(teamData: ScoreboardEntry | number) {
        return typeof teamData === 'number';
    }
}
