import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';

/**
 * Component displaying adaptive instance progress visualizations
 */
@Component({
  selector: 'kypo-adaptive-instance-progress',
  templateUrl: './adaptive-instance-progress.component.html',
  styleUrls: ['./adaptive-instance-progress.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdaptiveInstanceProgressComponent extends SentinelBaseDirective implements OnInit {
  trainingInstance$: Observable<TrainingInstance>;
  vizSize: { width: number; height: number };

  constructor(private activeRoute: ActivatedRoute) {
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
      tap(() => this.calculateVisualizationSize(window.innerWidth, window.innerHeight))
    );
  }

  private calculateVisualizationSize(windowWidth: number, windowHeight: number) {
    const width = windowWidth / 2;
    const height = windowHeight / 2;
    this.vizSize = { width, height };
  }
}
