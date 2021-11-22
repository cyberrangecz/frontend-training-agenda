import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';
import { TrainingDefinitionApi } from '@muni-kypo-crp/training-api';

/**
 * Component displaying training instance results visualizations
 */
@Component({
  selector: 'kypo-training-instance-results',
  templateUrl: './training-instance-results.component.html',
  styleUrls: ['./training-instance-results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingInstanceResultsComponent extends SentinelBaseDirective implements OnInit {
  hasReferenceSolution$: Observable<boolean>;
  trainingInstance$: Observable<TrainingInstance>;
  vizSize: { width: number; height: number };

  constructor(private activeRoute: ActivatedRoute, private trainingDefinitionApi: TrainingDefinitionApi) {
    super();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.calculateVisualizationSize(event.target.innerWidth, event.target.innerHeight);
  }

  ngOnInit(): void {
    this.trainingInstance$ = this.activeRoute.data.pipe(
      takeWhile(() => this.isAlive),
      map((data) => data[TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]),
      tap(
        (data) =>
          (this.hasReferenceSolution$ = this.trainingDefinitionApi.hasReferenceSolution(data.trainingDefinition.id))
      ),
      tap(() => this.calculateVisualizationSize(window.innerWidth, window.innerHeight))
    );
  }

  private calculateVisualizationSize(windowWidth: number, windowHeight: number) {
    const width = windowWidth / 2;
    const height = windowHeight / 2;
    this.vizSize = { width, height };
  }
}
