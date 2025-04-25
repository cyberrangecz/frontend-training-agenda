import { Component, Input, signal, WritableSignal } from '@angular/core';
import { LevelData } from '../jeopardy-level-category.component';
import { Color } from '../../../../../../../../../model/jeopardy-level';
import { delay, of } from 'rxjs';

@Component({
    selector: 'app-jeopardy-level-sublevel',
    templateUrl: './jeopardy-level-sublevel.component.html',
    styleUrl: './jeopardy-level-sublevel.component.css',
})
export class JeopardyLevelSublevelComponent {
    @Input({ required: true }) levelData: LevelData;
    @Input() color?: Color = undefined;
    @Input() hovered: boolean = false;

    @Input() completed: boolean = false;

    protected readonly of = of;
}
