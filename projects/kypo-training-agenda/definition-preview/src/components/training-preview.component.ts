import { Component, OnInit } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { Level } from '@muni-kypo-crp/training-model';
import { LevelStepperAdapter } from '@muni-kypo-crp/training-agenda/internal';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs';
import { TrainingPreviewStepper } from '../model/training-preview-stepper';
import { TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';

/**
 * Main component of training run preview.
 */
@Component({
  selector: 'kypo-designer-preview',
  templateUrl: './training-preview.component.html',
  styleUrls: ['./training-preview.component.css'],
})
export class TrainingPreviewComponent extends SentinelBaseDirective implements OnInit {
  activeLevel: Level;
  levels: Level[];
  stepper: TrainingPreviewStepper;

  constructor(private activeRoute: ActivatedRoute) {
    super();
    this.activeRoute.data
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((data) => (this.levels = data[TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME].levels));
  }

  ngOnInit(): void {
    if (this.levels?.length > 0) {
      this.init();
    }
  }

  private init() {
    const stepperAdapterLevels = this.levels.map((level) => new LevelStepperAdapter(level));
    this.stepper = new TrainingPreviewStepper(stepperAdapterLevels, 0);
    this.activeLevel = this.levels[0];
  }

  /**
   * Jump to training run level.
   * @param index of desired level
   */
  activeStepChanged(index: number): void {
    this.activeLevel = this.levels[index];
  }
}
