import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingRun } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { VisualizationInfo } from '@muni-kypo-crp/training-agenda/internal';
import { ADAPTIVE_RUN_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';

@Component({
  selector: 'kypo-adaptive-run-results',
  templateUrl: './adaptive-run-results.component.html',
  styleUrls: ['./adaptive-run-results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Component displaying visualization of adaptive run results
 */
export class AdaptiveRunResultsComponent extends SentinelBaseDirective implements OnInit {
  vizSize: { width: number; height: number };

  trainingRun$: Observable<any>;

  constructor(private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.trainingRun$ = this.activatedRoute.data.pipe(map((data) => data[ADAPTIVE_RUN_DATA_ATTRIBUTE_NAME]));
  }
}
