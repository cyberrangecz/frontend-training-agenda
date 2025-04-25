import { Component, Input, OnInit } from '@angular/core';
import { JeopardyConcreteService } from '../../../../services/training-run/level/jeopardy/jeopardy-concrete.service';
import {
    Color,
    JeopardyLevel,
    JeopardyLevelCategory,
    TeammatesActivity,
} from '../../../../../../../model/jeopardy-level';
import { LevelData } from './jeopardy-level-category/jeopardy-level-category.component';

@Component({
    selector: 'app-jeopardy-level-category-list',
    templateUrl: './jeopardy-level-category-list.component.html',
    styleUrl: './jeopardy-level-category-list.component.css',
})
export class JeopardyLevelCategoryListComponent implements OnInit {
    private readonly defaultCategoryName: string = 'Levels';

    @Input() jeopardyLevel: JeopardyLevel;

    teammatesActivity: TeammatesActivity;
    getCategoryName: (category: JeopardyLevelCategory) => string = (category) => category.name;

    constructor(private jeopardyLevelService: JeopardyConcreteService) {}

    ngOnInit() {
        this.teammatesActivity = this.jeopardyLevelService.getTeammatesActivity(this.jeopardyLevel);
        if (this.jeopardyLevel.categories === undefined) {
            this.jeopardyLevel.categories = [
                {
                    name: this.defaultCategoryName,
                    levels: this.jeopardyLevel.subLevels.reduce((acc, subLevel) => {
                        acc[subLevel.id] = undefined;
                        return acc;
                    }, {}),
                },
            ];
        }
    }

    getLevelData(category: JeopardyLevelCategory): LevelData[] {
        const includedLevelIds = Object.keys(category.levels).map(Number);
        const levels = this.jeopardyLevel.subLevels.filter((level) => includedLevelIds.includes(level.id));

        return levels
            .map((level) => ({
                levelId: level.id,
                title: level.title,
                description: category.levels[level.id],
                players: this.teammatesActivity[level.id] || [],
                maxPoints: level.maxScore,
            }))
            .sort((a, b) => a.maxPoints - b.maxPoints);
    }
}
