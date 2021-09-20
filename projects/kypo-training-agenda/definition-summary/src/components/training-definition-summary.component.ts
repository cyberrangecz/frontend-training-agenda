import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'kypo-training-definition-summary',
  templateUrl: './training-definition-summary.component.html',
  styleUrls: ['./training-definition-summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingDefinitionSummaryComponent extends SentinelBaseDirective implements OnInit {
  trainingDefinition$: Observable<TrainingDefinition>;

  constructor(private activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.trainingDefinition$ = this.activeRoute.data.pipe(map((data) => data[TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME]));
  }
}
