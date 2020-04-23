import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KypoBaseComponent } from 'kypo-common';
import { KypoControlItem } from 'kypo-controls';
import { TrainingInstance } from 'kypo-training-model';
import { Observable } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { TrainingInstanceSummaryControls } from '../../../../model/adapters/controls/instance/training-instance-summary-controls';
import { TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME } from '../../../../model/client/activated-route-data-attributes';
import { TrainingNavigator } from '../../../../services/client/training-navigator.service';
import { TrainingInstanceSummaryService } from '../../../../services/training-instance/summary/training-instance-summary.service';

/**
 * Smart component of training instance summary
 */
@Component({
  selector: 'kypo-training-instance-summary',
  templateUrl: './training-instance-summary.component.html',
  styleUrls: ['./training-instance-summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingInstanceSummaryComponent extends KypoBaseComponent implements OnInit {
  trainingInstance$: Observable<TrainingInstance>;
  trainingInstanceAccessTokenLink: string;
  trainingInstancePoolIdLink: string;
  controls: KypoControlItem[];
  private expanded: Set<number> = new Set();

  constructor(
    private activeRoute: ActivatedRoute,
    private navigator: TrainingNavigator,
    private service: TrainingInstanceSummaryService
  ) {
    super();
  }

  ngOnInit() {
    this.trainingInstance$ = this.activeRoute.data.pipe(
      map((data) => data[TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]),
      tap((ti) => {
        this.service.set(ti);
        this.trainingInstanceAccessTokenLink = `/${this.navigator.toTrainingInstanceAccessToken(ti.id)}`;
        this.trainingInstancePoolIdLink = `/${this.navigator.toPool(ti.poolId)}`;

        const disabled$ = this.service.hasStarted$.pipe(map((hasStated) => !hasStated));
        this.controls = TrainingInstanceSummaryControls.create(this.service, disabled$, disabled$);
      })
    );
  }

  onControlAction(control: KypoControlItem) {
    control.result$.pipe(takeWhile((_) => this.isAlive)).subscribe();
  }
  /**
   * Opens expansion panel of index
   * @param index index of expansion panel to open
   */
  open(index: number) {
    this.expanded.add(index);
  }

  /**
   * Closes expansion panel of index
   * @param index index of expansion panel to close
   */
  close(index: number) {
    this.expanded.delete(index);
  }

  /**
   * True if expansion panel on provided index is opened, false otherwise
   * @param index index of expansion panel
   */
  isOpen(index: number): boolean {
    return this.expanded.has(index);
  }
}
