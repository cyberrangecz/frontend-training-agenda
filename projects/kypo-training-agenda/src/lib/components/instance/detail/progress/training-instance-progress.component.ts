import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {map, takeWhile} from 'rxjs/operators';
import {KypoBaseComponent} from 'kypo-common';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {TrainingInstance} from 'kypo-training-model';
import {TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME} from '../../../../model/client/activated-route-data-attributes';

/**
 * Component displaying progress visualization
 */
@Component({
  selector: 'kypo-training-instance-progress',
  templateUrl: './training-instance-progress.component.html',
  styleUrls: ['./training-instance-progress.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingInstanceProgressComponent extends KypoBaseComponent implements OnInit {

  @Input() trainingInstance$: Observable<TrainingInstance>;

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
