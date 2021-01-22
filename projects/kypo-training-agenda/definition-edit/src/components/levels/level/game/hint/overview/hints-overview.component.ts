import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
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
import {
  SentinelConfirmationDialogComponent,
  SentinelConfirmationDialogConfig,
  SentinelDialogResultEnum,
} from '@sentinel/components/dialogs';
import { SentinelBaseDirective } from '@sentinel/common';
import { SentinelControlItem } from '@sentinel/components/controls';
import { Hint } from '@muni-kypo-crp/training-model';
import { SentinelStepper } from '@sentinel/components/stepper';
import { BehaviorSubject, defer, of } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { HintStepperAdapter } from '../../../../../../model/adapters/hint-stepper-adapter';

/**
 * Main hint edit component. Contains stepper to navigate through existing hints and controls to create new hints
 */
@Component({
  selector: 'kypo-hints-overview',
  templateUrl: './hints-overview.component.html',
  styleUrls: ['./hints-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class HintsOverviewComponent extends SentinelBaseDirective implements OnInit, OnChanges {
  @Input() hints: Hint[];
  @Input() levelId: Hint[];
  @Input() levelMaxScore: number;
  @Output() hintsChange: EventEmitter<Hint[]> = new EventEmitter();

  private deleteDisabledSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  hintsHasErrors: boolean;
  penaltySum: number;
  selectedStep: number;
  stepperHints: SentinelStepper<HintStepperAdapter> = { items: [] };
  controls: SentinelControlItem[];

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.selectedStep = 0;
    this.initControls();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('levelId' in changes) {
      this.selectedStep = 0;
    }
    if ('hints' in changes) {
      this.deleteDisabledSubject$.next(this.hints.length <= 0);
      this.stepperHints.items = this.hints.map((hint) => new HintStepperAdapter(hint));
      this.setInitialHintPenaltySum();
      this.calculateHasError();
    }
    if (this.stepperHints.items.length > 0) {
      this.stepperHints.items[this.selectedStep].isActive = true;
    }
  }

  onControlAction(control: SentinelControlItem): void {
    control.result$.pipe(takeWhile(() => this.isAlive)).subscribe();
  }

  /**
   * Creates new hint with default values
   */
  addHint(): void {
    if (this.stepperHints.items.length >= 1) {
      this.stepperHints.items[this.selectedStep].isActive = false;
    }
    const hint = new Hint();
    hint.title = 'New hint';
    hint.penalty = 0;
    hint.content = 'Write hint content here...';
    hint.order = this.stepperHints.items.length;
    const hintStepperAdapter = new HintStepperAdapter(hint);
    hintStepperAdapter.isActive = true;
    this.stepperHints.items.push(hintStepperAdapter);
    this.selectedStep = this.stepperHints.items.length - 1;
    this.onHintsChanged();
  }

  /**
   * Displays confirmation dialog window, if confirmed, deletes given active hint from list of hints
   */
  deleteActiveHint(): void {
    const hint = this.stepperHints.items[this.selectedStep];
    const index = this.selectedStep;
    const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
      data: new SentinelConfirmationDialogConfig(
        'Delete Hint',
        `Do you want to delete hint "${hint.title}"?`,
        'Cancel',
        'Delete'
      ),
    });

    dialogRef
      .afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((result) => {
        if (result === SentinelDialogResultEnum.CONFIRMED) {
          this.stepperHints.items.splice(index, 1);
          this.changeSelectedStepAfterRemoving(index);
          this.onOrderUpdate();
        }
      });
  }

  /**
   * Triggered after selection of active hint is changed in the stepper
   * @param index index of active hint
   */
  onActiveHintChanged(index: number): void {
    if (index !== this.selectedStep && this.stepperHints.items.length > 0) {
      this.stepperHints.items[this.selectedStep].isActive = false;
      this.selectedStep = index;
    }
  }

  /**
   * Updates order of stepper items to match order of the hints
   */
  onOrderUpdate(): void {
    this.stepperHints.items.forEach((hint, index) => {
      this.stepperHints.items[index].hint.order = index;
    });
    this.onHintsChanged();
  }

  /**
   * Emits event if new hint is added or saved
   */
  onHintsChanged(hint: Hint = null): void {
    if (hint) {
      this.stepperHints.items[this.selectedStep].hint = hint;
    }
    this.calculateHintPenaltySum();
    this.calculateHasError();
    this.hintsChange.emit(this.stepperHints.items.map((item) => item.hint));
  }

  /**
   * Changes selected step to the one before removed or to first one if the first step is removed
   * @param {number} index index of the removed step
   */
  private changeSelectedStepAfterRemoving(index: number) {
    if (index === 0) {
      this.selectedStep = 0;
    } else {
      this.selectedStep--;
    }
    this.onActiveHintChanged(this.stepperHints.items.length - 1);
    if (this.stepperHints.items.length > 0) {
      this.stepperHints.items[this.stepperHints.items.length - 1].isActive = true;
    }
  }

  private calculateHasError() {
    this.hintsHasErrors = this.hints.some((hint) => !hint.valid);
  }

  /**
   * Calculates and sets initial hint penalty sum from level max score and sum of hints penalties.
   * Should be used only to calculate the sum BEFORE hint components are initialized
   */
  private setInitialHintPenaltySum() {
    if (this.hints.length === 0) {
      this.penaltySum = 0;
    } else {
      this.penaltySum = this.hints.map((hint) => hint.penalty).reduce((sum, currentPenalty) => sum + currentPenalty);
    }
  }

  /**
   * Calculates max hint penalty from level max score and sum of hints penalties. Updates initial penalty sum for new added hints
   * Should be used only to calculate the sum AFTER hint components are initialized
   */
  private calculateHintPenaltySum() {
    let hintsPenaltySum = 0;
    this.stepperHints.items.forEach((item) => {
      hintsPenaltySum += item.hint.penalty;
    });
    this.penaltySum = hintsPenaltySum;
  }

  private initControls() {
    this.controls = [
      new SentinelControlItem(
        'add',
        'Add',
        'primary',
        of(false),
        defer(() => this.addHint())
      ),
      new SentinelControlItem(
        'delete',
        'Delete',
        'warn',
        this.deleteDisabledSubject$.asObservable(),
        defer(() => this.deleteActiveHint())
      ),
    ];
  }
}
