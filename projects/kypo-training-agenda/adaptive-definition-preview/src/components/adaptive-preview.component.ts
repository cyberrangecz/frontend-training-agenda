import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { AccessTrainingRunInfo, Phase } from '@muni-kypo-crp/training-model';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';
import { map, takeWhile } from 'rxjs/operators';
import { ADAPTIVE_DEFINITION_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';
import { RunningAdaptiveRunService } from '@muni-kypo-crp/training-agenda/internal';
import { AdaptiveDefinitionApiService } from '@muni-kypo-crp/training-api';

/**
 * Main component of training run preview. Initializes mock services with data of training definition to simulate
 * real server behaviour.
 */
@Component({
  selector: 'kypo-designer-preview',
  templateUrl: './adaptive-preview.component.html',
  styleUrls: ['./adaptive-preview.component.css'],
})
export class AdaptivePreviewComponent extends SentinelBaseDirective implements OnInit {
  constructor(
    private previewService: RunningAdaptiveRunService,
    private api: AdaptiveDefinitionApiService,
    private activeRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeGame();
  }

  private initializeGame() {
    this.activeRoute.data
      .pipe(
        takeWhile(() => this.isAlive),
        map((data) => data[ADAPTIVE_DEFINITION_DATA_ATTRIBUTE_NAME])
      )
      .subscribe((training) => {
        this.previewService.init(this.createMockTrainingRun(training));
      });
  }

  private createMockTrainingRun(training: TrainingDefinition) {
    const mockRun = new AccessTrainingRunInfo();
    mockRun.isPreview = true;
    mockRun.levels = training.levels as Phase[];
    mockRun.isStepperDisplayed = training.showStepperBar;
    return mockRun;
  }
}
