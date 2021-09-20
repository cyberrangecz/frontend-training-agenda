import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';

/**
 * Component displaying adaptive instance results visualizations
 */
@Component({
  selector: 'kypo-adaptive-instance-results',
  templateUrl: './adaptive-instance-results.component.html',
  styleUrls: ['./adaptive-instance-results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdaptiveInstanceResultsComponent extends SentinelBaseDirective {
  constructor(private activeRoute: ActivatedRoute) {
    super();
  }
}
