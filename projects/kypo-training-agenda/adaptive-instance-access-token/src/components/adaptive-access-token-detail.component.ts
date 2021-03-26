import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { ADAPTIVE_INSTANCE_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';

/**
 * Displays access token of training instance for presentational purposes (to display on projector etc.)
 */
@Component({
  selector: 'kypo-access-token-detail',
  templateUrl: './adaptive-access-token-detail.component.html',
  styleUrls: ['./adaptive-access-token-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdaptiveAccessTokenDetailComponent extends SentinelBaseDirective implements OnInit {
  trainingInstance$: Observable<TrainingInstance>;

  constructor(private activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.trainingInstance$ = this.activeRoute.data.pipe(
      takeWhile(() => this.isAlive),
      map((data) => data[ADAPTIVE_INSTANCE_DATA_ATTRIBUTE_NAME])
    );
  }
}
