import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JeopardyLevel } from '../../../../../../model/jeopardy-level';
import { JeopardyConcreteService } from '../../../services/training-run/level/jeopardy/jeopardy-concrete.service';
import { generateCategories } from '../../../../../../mocking/jeopardy-generation';
import { Team } from '../../../../../../model/team';

@Component({
    selector: 'kypo-jeopardy-level',
    templateUrl: './jeopardy-level.component.html',
    styleUrl: './jeopardy-level.component.css',
    providers: [JeopardyConcreteService],
})
export class JeopardyLevelComponent implements OnInit {
    @Input() level!: JeopardyLevel;
    @Output() titleChange = new EventEmitter<string>();
    @Input() isStepperDisplayed: boolean = false;
    @Input() team: Team;

    @Output() scoreAdd = new EventEmitter<number>();

    totalPoints: number = 20;

    constructor(private jeopardyService: JeopardyConcreteService) {}

    ngOnInit() {
        this.jeopardyService.getDisplayedLevelTitle$().subscribe((title) => {
            this.titleChange.emit(title);
        });
    }

    protected readonly generateCategories = generateCategories;
}
