import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingDefinitionApi } from '@muni-kypo-crp/training-api';
import { AccessTrainingRunInfo, Level } from '@muni-kypo-crp/training-model';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';
import { map, takeWhile } from 'rxjs/operators';
import { TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';
import { RunningTrainingRunService } from '@muni-kypo-crp/training-agenda/internal';

/**
 * Main component of training run preview. Initializes mock services with data of training definition to simulate
 * real server behaviour.
 */
@Component({
  selector: 'kypo-designer-preview',
  templateUrl: './training-preview.component.html',
  styleUrls: ['./training-preview.component.css'],
})
export class TrainingPreviewComponent extends SentinelBaseDirective implements OnInit {
  constructor(
    private previewService: RunningTrainingRunService,
    private api: TrainingDefinitionApi,
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
        map((data) => data[TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME])
      )
      .subscribe((training) => {
        this.previewService.init(this.createMockTrainingRun(training));
      });
  }

  private createMockTrainingRun(training: TrainingDefinition) {
    const mockRun = new AccessTrainingRunInfo();
    mockRun.isPreview = true;
    mockRun.levels = training.levels as Level[];
    mockRun.isStepperDisplayed = training.showStepperBar;
    return mockRun;
  }
}
