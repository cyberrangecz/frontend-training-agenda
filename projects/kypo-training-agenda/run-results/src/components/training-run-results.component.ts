import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingRun } from '@muni-kypo-crp/training-model';
import { Kypo2TraineeModeInfo } from '@muni-kypo-crp/overview-visualization';
import { Observable } from 'rxjs';
import { map, take, takeWhile, tap } from 'rxjs/operators';
import { VisualizationInfo } from '@muni-kypo-crp/training-agenda/internal';
import { TRAINING_RUN_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';
import { TrainingDefinitionApi } from '@muni-kypo-crp/training-api';
import { SentinelControlItem } from '@sentinel/components/controls';
import { TrainingRunResultsControls } from '../model/training-run-results-controls';
import { MitreTechniquesOverviewService } from '../service/mitre-techniques.service';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private trainingDefinitionApi: TrainingDefinitionApi,
    private service: MitreTechniquesOverviewService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadVisualizationInfo();
  }

  /**
   * Resolves controls action and calls appropriate handler
   * @param control selected control emitted by controls component
   */
  onControlsAction(control: SentinelControlItem): void {
    control.result$.pipe(take(1)).subscribe();
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
