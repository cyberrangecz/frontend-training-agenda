import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingDefinitionApi } from 'kypo-training-api';
import { AccessTrainingRunInfo } from 'kypo-training-model';
import { TrainingDefinition } from 'kypo-training-model';
import { map, takeWhile } from 'rxjs/operators';
import { TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME } from '@kypo/training-agenda';
import { RunningTrainingRunService } from '@kypo/training-agenda/internal';

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

  ngOnInit() {
    this.initializeGame();
  }

  private initializeGame() {
    this.activeRoute.data
      .pipe(
        takeWhile((_) => this.isAlive),
        map((data) => data[TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME])
      )
      .subscribe((training) => {
        this.previewService.init(this.createMockTrainingRun(training));
      });
  }

  private createMockTrainingRun(training: TrainingDefinition) {
    const mockRun = new AccessTrainingRunInfo();
    mockRun.levels = training.levels;
    mockRun.isStepperDisplayed = training.showStepperBar;
    return mockRun;
  }
}
