import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { TrainingDefinitionApi } from '@muni-kypo-crp/training-api';
import { TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';

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

  constructor(private activeRoute: ActivatedRoute, private trainingDefinitionApi: TrainingDefinitionApi) {
    super();
  }

  ngOnInit(): void {
    this.activeRoute.data
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        (data) =>
          (this.hasReferenceSolution$ = this.trainingDefinitionApi.hasReferenceSolution(
            data[TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME].trainingDefinition.id
          ))
      );
  }
}
