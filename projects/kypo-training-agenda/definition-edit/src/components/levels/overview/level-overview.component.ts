import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SentinelBaseDirective } from '@sentinel/common';
import { SentinelControlItem } from '@sentinel/components/controls';
import { Level, MitreTechnique, TrainingDefinition } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { LevelOverviewControls } from '../../../model/adapters/level-overview-controls';
import { LevelStepperAdapter } from '@muni-kypo-crp/training-agenda/internal';
import { LevelMoveEvent } from '../../../model/events/level-move-event';
import { LevelEditService } from '../../../services/state/level/level-edit.service';

/**
 * Smart component for level stepper and level edit components
 */
@Component({
  selector: 'kypo-level-overview',
  templateUrl: './level-overview.component.html',
  styleUrls: ['./level-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelOverviewComponent extends SentinelBaseDirective implements OnInit, OnChanges {
  @Output() unsavedLevels: EventEmitter<Level[]> = new EventEmitter();
  @Output() levelsCount: EventEmitter<number> = new EventEmitter();
  @Input() trainingDefinition: TrainingDefinition;
  @Input() editMode: boolean;
  @Input() mitreTechniquesList: MitreTechnique[];

  activeStep$: Observable<number>;
  stepperLevels: Observable<LevelStepperAdapter[]>;
  controls: SentinelControlItem[];
  levelMovingInProgress: boolean;

  constructor(private dialog: MatDialog, private levelService: LevelEditService) {
    super();
  }

  ngOnInit(): void {
    this.activeStep$ = this.levelService.activeStep$;
    this.stepperLevels = this.levelService.levels$.pipe(
      map((levels) => levels.map((level) => new LevelStepperAdapter(level))),
      tap(() => this.levelsCount.emit(this.levelService.getLevelsCount()))
    );

    this.levelService.unsavedLevels$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((unsavedLevels) => this.unsavedLevels.emit(unsavedLevels));
    this.initControl();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('trainingDefinition' in changes) {
      this.levelService.set(this.trainingDefinition.id, this.trainingDefinition.levels as Level[]);
    }
  }

  /**
   * Calls service to set new active level
   * @param levelIndex index of new active level
   */
  onActiveLevelChange(levelIndex: number): void {
    this.levelService.setActiveLevel(levelIndex);
  }

  onControlAction(control: SentinelControlItem): void {
    control.result$.pipe(takeWhile(() => this.isAlive)).subscribe();
  }

  /**
   * Call service to move level from original position to a new one
   * @param event event of level move
   */
  onLevelMoved(event: LevelMoveEvent): void {
    this.levelMovingInProgress = true;
    this.levelService
      .move(event.stepperState.previousIndex, event.stepperState.currentIndex)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        () => {
          this.levelMovingInProgress = false;
        },
        () => (this.levelMovingInProgress = false)
      );
  }

  /**
   * Calls service to change active level
   * @param level level to set as active
   */
  onActiveLevelChanged(level: Level): void {
    this.levelService.onActiveLevelChanged(level);
  }

  private initControl() {
    const deleteDisabled$ = this.levelService.levels$.pipe(map((levels) => levels.length <= 0));
    this.controls = LevelOverviewControls.create(this.levelService, this.editMode, deleteDisabled$);
  }
}
