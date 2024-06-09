import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { Phase } from '@muni-kypo-crp/training-model';
import { takeWhile } from 'rxjs/operators';
import { ADAPTIVE_DEFINITION_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';
import { PhaseStepperAdapter } from '@muni-kypo-crp/training-agenda/internal';
import { AdaptivePreviewStepper } from '../model/adaptive-preview-stepper';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kypo-designer-preview',
  templateUrl: './adaptive-preview.component.html',
  styleUrls: ['./adaptive-preview.component.css'],
})
export class AdaptivePreviewComponent implements OnInit {
  activePhase: Phase;
  phases: Phase[];
  stepper: AdaptivePreviewStepper;
  isStepperDisplayed: boolean;

  constructor(private activeRoute: ActivatedRoute) {
    this.activeRoute.data.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.phases = data[ADAPTIVE_DEFINITION_DATA_ATTRIBUTE_NAME].levels;
      this.isStepperDisplayed = data[ADAPTIVE_DEFINITION_DATA_ATTRIBUTE_NAME].showStepperBar;
    });
  }

  ngOnInit(): void {
    if (this.phases?.length > 0) {
      this.init();
    }
  }

  private init() {
    const stepperAdapterPhases = this.phases.map((phase) => new PhaseStepperAdapter(phase));
    this.stepper = new AdaptivePreviewStepper(stepperAdapterPhases, 0);
    this.activePhase = this.phases[0];
  }

  /**
   * Jump to adaptive run phase.
   * @param index of desired phase
   */
  activeStepChanged(index: number): void {
    this.activePhase = this.phases[index];
  }
}
