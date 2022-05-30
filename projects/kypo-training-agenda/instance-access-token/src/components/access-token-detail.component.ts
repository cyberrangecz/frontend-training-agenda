import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';

/**
 * Displays access token of training instance for presentational purposes (to display on projector etc.)
 */
@Component({
  selector: 'kypo-access-token-detail',
  templateUrl: './access-token-detail.component.html',
  styleUrls: ['./access-token-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessTokenDetailComponent extends SentinelBaseDirective implements OnInit {
  trainingInstance$: Observable<TrainingInstance>;

  constructor(private activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.trainingInstance$ = this.activeRoute.data.pipe(
      takeWhile(() => this.isAlive),
      map((data) => data[TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME])
    );
  }
}
