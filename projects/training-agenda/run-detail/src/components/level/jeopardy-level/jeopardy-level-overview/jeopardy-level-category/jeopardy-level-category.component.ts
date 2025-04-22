import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../../../../../model/team';
import { Color } from '../../../../../../../../model/jeopardy-level';
export interface LevelData {
    levelId: number;
    title: string;
    description: string | undefined;
    players: User[];
    maxPoints: number;
}

@Component({
    selector: 'app-jeopardy-level-category',
    templateUrl: './jeopardy-level-category.component.html',
    styleUrl: './jeopardy-level-category.component.css',
})
export class JeopardyLevelCategoryComponent implements OnInit {
    @Input({ required: true }) title!: string;
    @Input() color?: Color = undefined;
    @Input() levelData: LevelData[] = [];
    getLevelDataId: (item: LevelData) => number = (item: LevelData) => item.levelId;

    ngOnInit(): void {}
}
