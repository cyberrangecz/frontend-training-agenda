import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';

/**
 * Component displaying progress visualization
 */
@Component({
  selector: 'kypo-training-instance-progress',
  templateUrl: './training-instance-progress.component.html',
  styleUrls: ['./training-instance-progress.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingInstanceProgressComponent extends SentinelBaseDirective implements OnInit {
  @Input() trainingInstance$: Observable<TrainingInstance>;

  constructor(private activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.trainingInstance$ = this.activeRoute.data.pipe(
      takeWhile((_) => this.isAlive),
      map((data) => data[TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME])
    );
  }
}
