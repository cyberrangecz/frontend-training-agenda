import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainingRun } from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';
import { map, Observable, takeWhile } from 'rxjs';
import { VisualizationInfo } from '@muni-kypo-crp/training-agenda/internal';
import { KypoTraineeModeInfo } from '@muni-kypo-crp/overview-visualization';
import { TRAINING_RUN_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';
import { TrainingDefinitionApi } from '@muni-kypo-crp/training-api';

@Component({
  selector: 'kypo-score-development-wrapper',
  templateUrl: './score-development-wrapper.component.html',
  styleUrls: ['./score-development-wrapper.component.css'],
})
export class ScoreDevelopmentWrapperComponent extends SentinelBaseDirective implements OnInit {
  visualizationInfo$: Observable<VisualizationInfo>;
  traineeModeInfo$: Observable<KypoTraineeModeInfo>;
  vizSize: { width: number; height: number };

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.setVisualizationSize(event.target.innerWidth, event.target.innerHeight);
  }

  constructor(private activatedRoute: ActivatedRoute, private trainingDefinitionApi: TrainingDefinitionApi) {
    super();
  }

  ngOnInit(): void {
    this.setVisualizationSize(window.innerWidth, innerHeight);
    this.loadVisualizationInfo();
  }

  /**
   * Gets asynchronous data for visualizations
   */
  loadVisualizationInfo(): void {
    this.visualizationInfo$ = this.activatedRoute.data.pipe(
      takeWhile(() => this.isAlive),
      map((data) => this.createTrainingVisualizationInfo(data[TRAINING_RUN_DATA_ATTRIBUTE_NAME]))
    );
    this.traineeModeInfo$ = this.visualizationInfo$.pipe(
      map((vizInfo) => {
        const traineeModeInfo = new KypoTraineeModeInfo();
        traineeModeInfo.trainingRunId = vizInfo.trainingRunId;
        traineeModeInfo.activeTraineeId = vizInfo.traineeId;
        return traineeModeInfo;
      })
    );
  }

  private createTrainingVisualizationInfo(trainingRun: TrainingRun): VisualizationInfo {
    const visualizationInfo = new VisualizationInfo();
    visualizationInfo.trainingDefinitionId = trainingRun.trainingDefinitionId;
    visualizationInfo.trainingInstanceId = trainingRun.trainingInstanceId;
    visualizationInfo.trainingRunId = trainingRun.id;
    visualizationInfo.traineeId = trainingRun?.player?.id;
    return visualizationInfo;
  }

  private setVisualizationSize(windowWidth: number, windowHeight: number) {
    const divideBy = 2;
    const width = windowWidth / divideBy;
    const height = windowHeight / divideBy;
    this.vizSize = { width, height };
  }
}
