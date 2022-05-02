import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingRun } from '@muni-kypo-crp/training-model';
import { Kypo2TraineeModeInfo } from '@muni-kypo-crp/overview-visualization';
import { Observable } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { VisualizationInfo } from '@muni-kypo-crp/training-agenda/internal';
import { TRAINING_RUN_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';
import { TrainingDefinitionApi } from '@muni-kypo-crp/training-api';

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
  hasReferenceSolution$: Observable<boolean>;

  constructor(private activatedRoute: ActivatedRoute, private trainingDefinitionApi: TrainingDefinitionApi) {
    super();
  }

  ngOnInit(): void {
    this.loadVisualizationInfo();
  }

  /**
   * Gets asynchronous data for visualizations
   */
  loadVisualizationInfo(): void {
    this.activatedRoute.data
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        (data) =>
          (this.hasReferenceSolution$ = this.trainingDefinitionApi.hasReferenceSolution(
            data[TRAINING_RUN_DATA_ATTRIBUTE_NAME].trainingDefinitionId
          ))
      );
  }
}
