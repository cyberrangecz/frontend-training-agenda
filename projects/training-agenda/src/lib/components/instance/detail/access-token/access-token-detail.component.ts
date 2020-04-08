import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TrainingInstance} from 'kypo-training-model';
import {KypoBaseComponent} from 'kypo-common';
import {map, takeWhile} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME} from '../../../../model/client/activated-route-data-attributes';

/**
 * Displays access token of training instance for presentational purposes (to display on projector etc.)
 */
@Component({
  selector: 'kypo-access-token-detail',
  templateUrl: './access-token-detail.component.html',
  styleUrls: ['./access-token-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessTokenDetailComponent extends KypoBaseComponent implements OnInit {

  trainingInstance$: Observable<TrainingInstance>;

  constructor(private activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.trainingInstance$ = this.activeRoute.data
      .pipe(
        takeWhile(_ => this.isAlive),
        map(data => data[TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME])
      );
  }
}
