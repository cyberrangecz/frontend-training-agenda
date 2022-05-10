import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { Phase } from '@muni-kypo-crp/training-model';
import { takeWhile } from 'rxjs/operators';
import { ADAPTIVE_DEFINITION_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';
import { PhaseStepperAdapter } from '@muni-kypo-crp/training-agenda/internal';
import { AdaptivePreviewStepper } from '../model/adaptive-preview-stepper';

@Component({
  selector: 'kypo-designer-preview',
  templateUrl: './adaptive-preview.component.html',
  styleUrls: ['./adaptive-preview.component.css'],
})
export class AdaptivePreviewComponent extends SentinelBaseDirective implements OnInit {
  activePhase: Phase;
  phases: Phase[];
  stepper: AdaptivePreviewStepper;

  constructor(private activeRoute: ActivatedRoute) {
    super();
    this.activeRoute.data
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((data) => (this.phases = data[ADAPTIVE_DEFINITION_DATA_ATTRIBUTE_NAME].levels));
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
