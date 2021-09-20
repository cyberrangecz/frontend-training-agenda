import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ADAPTIVE_DEFINITION_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'kypo-adaptive-definition-summary',
  templateUrl: './adaptive-definition-summary.component.html',
  styleUrls: ['./adaptive-definition-summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdaptiveDefinitionSummaryComponent extends SentinelBaseDirective implements OnInit {
  adaptiveDefinition$: Observable<TrainingDefinition>;

  constructor(private activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.activeRoute.data.pipe(map((data) => data[ADAPTIVE_DEFINITION_DATA_ATTRIBUTE_NAME]));
    this.adaptiveDefinition$ = this.activeRoute.data.pipe(map((data) => data[ADAPTIVE_DEFINITION_DATA_ATTRIBUTE_NAME]));
  }
}
