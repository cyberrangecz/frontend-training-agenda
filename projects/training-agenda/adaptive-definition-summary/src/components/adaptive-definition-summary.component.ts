import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ADAPTIVE_DEFINITION_DATA_ATTRIBUTE_NAME } from '@cyberrangecz-platform/training-agenda';
import { TrainingDefinition } from '@cyberrangecz-platform/training-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'crczp-adaptive-definition-summary',
  templateUrl: './adaptive-definition-summary.component.html',
  styleUrls: ['./adaptive-definition-summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdaptiveDefinitionSummaryComponent implements OnInit {
  adaptiveDefinition$: Observable<TrainingDefinition>;

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.data.pipe(map((data) => data[ADAPTIVE_DEFINITION_DATA_ATTRIBUTE_NAME]));
    this.adaptiveDefinition$ = this.activeRoute.data.pipe(map((data) => data[ADAPTIVE_DEFINITION_DATA_ATTRIBUTE_NAME]));
  }
}
