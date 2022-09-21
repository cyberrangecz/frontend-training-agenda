import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ADAPTIVE_RUN_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';
import { SentinelControlItem } from '@sentinel/components/controls';
import { TrainingRunResultsControls } from '../model/training-run-results-controls';
import { MitreTechniquesOverviewService } from '../service/mitre-techniques.service';

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
  controls: SentinelControlItem[] = [];

  constructor(private activatedRoute: ActivatedRoute, private service: MitreTechniquesOverviewService) {
    super();
  }

  /**
   * Resolves controls action and calls appropriate handler
   * @param control selected control emitted by controls component
   */
  onControlsAction(control: SentinelControlItem): void {
    control.result$.pipe(take(1)).subscribe();
  }

  ngOnInit(): void {
    this.controls = TrainingRunResultsControls.createControls(this.service);
    this.trainingRun$ = this.activatedRoute.data.pipe(map((data) => data[ADAPTIVE_RUN_DATA_ATTRIBUTE_NAME]));
  }
}
