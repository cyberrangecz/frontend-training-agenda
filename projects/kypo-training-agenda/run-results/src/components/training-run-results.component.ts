import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingRun } from '@kypo/training-model';
import { Kypo2TraineeModeInfo } from '@kypo/overview-visualization';
import { Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { VisualizationInfo } from '@kypo/training-agenda/internal';
import { TRAINING_RUN_DATA_ATTRIBUTE_NAME } from '@kypo/training-agenda';

@Component({
  selector: 'kypo-training-run-results',
  templateUrl: './training-run-results.component.html',
  styleUrls: ['./training-run-results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Component displaying visualization of training run results
 */
export class TrainingRunResultsComponent extends SentinelBaseDirective implements OnInit {
  vizSize: { width: number; height: number };

  visualizationInfo$: Observable<VisualizationInfo>;
  traineeModeInfo$: Observable<Kypo2TraineeModeInfo>;

  constructor(private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.setVisualizationSize(window.innerWidth, innerHeight);
    this.loadVisualizationInfo();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setVisualizationSize(event.target.innerWidth, event.target.innerHeight);
  }

  /**
   * Gets asynchronous data for visualizations
   */
  loadVisualizationInfo() {
    this.visualizationInfo$ = this.activatedRoute.data.pipe(
      takeWhile((_) => this.isAlive),
      map((data) => this.createTrainingVisualizationInfo(data[TRAINING_RUN_DATA_ATTRIBUTE_NAME]))
    );
    this.traineeModeInfo$ = this.visualizationInfo$.pipe(
      map((vizInfo) => {
        const traineeModeInfo = new Kypo2TraineeModeInfo();
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
