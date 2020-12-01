import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingInstance } from '@kypo/training-model';
import { Observable } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME } from '@kypo/training-agenda';

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
  trainingInstance$: Observable<TrainingInstance>;
  vizSize: { width: number; height: number };

  constructor(private activeRoute: ActivatedRoute) {
    super();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateVisualizationSize(event.target.innerWidth, event.target.innerHeight);
  }

  ngOnInit() {
    this.trainingInstance$ = this.activeRoute.data.pipe(
      takeWhile((_) => this.isAlive),
      map((data) => data[TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]),
      tap((_) => this.calculateVisualizationSize(window.innerWidth, window.innerHeight))
    );
  }

  private calculateVisualizationSize(windowWidth: number, windowHeight: number) {
    const width = windowWidth / 2;
    const height = windowHeight / 2;
    this.vizSize = { width, height };
  }
}
