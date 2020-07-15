import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { SentinelBaseDirective, RequestedPagination } from '@sentinel/common';
import { SentinelControlItem } from '@sentinel/components/controls';
import { TrainingInstance } from 'kypo-training-model';
import { SentinelTable, LoadTableEvent, TableActionEvent } from '@sentinel/components/table';
import { Observable } from 'rxjs';
import { map, take, takeWhile } from 'rxjs/operators';
import { TrainingInstanceOverviewControls } from '../model/adapters/training-instance-overview-controls';
import { TrainingInstanceTable } from '../model/adapters/training-instance-table';
import { TrainingNavigator } from 'kypo-training-agenda';
import { TrainingAgendaContext } from 'kypo-training-agenda/internal';
import { TrainingInstanceOverviewService } from '../services/state/training-instance-overview.service';

/**
 * Main component of organizer overview.
 */
@Component({
  selector: 'kypo-training-instance-overview',
  templateUrl: './training-instance-overview.component.html',
  styleUrls: ['./training-instance-overview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingInstanceOverviewComponent extends SentinelBaseDirective implements OnInit, OnDestroy {
  readonly INITIAL_SORT_NAME = 'startTime';
  readonly INITIAL_SORT_DIR = 'desc';

  instances$: Observable<SentinelTable<TrainingInstance>>;
  hasError$: Observable<boolean>;

  controls: SentinelControlItem[];

  constructor(
    private service: TrainingInstanceOverviewService,
    private context: TrainingAgendaContext,
    private navigator: TrainingNavigator
  ) {
    super();
  }

  ngOnInit() {
    this.controls = TrainingInstanceOverviewControls.create(this.service);
    this.initTable();
  }

  onControlAction(control: SentinelControlItem) {
    control.result$.pipe(takeWhile((_) => this.isAlive)).subscribe();
  }

  onInstancesLoadEvent(loadEvent: LoadTableEvent) {
    this.service
      .getAll(loadEvent.pagination, loadEvent.filter)
      .pipe(takeWhile((_) => this.isAlive))
      .subscribe();
  }

  onInstanceAction(event: TableActionEvent<any>) {
    event.action.result$.pipe(take(1)).subscribe();
  }

  private initTable() {
    const initLoadEvent = new LoadTableEvent(
      new RequestedPagination(
        0,
        this.context.config.defaultPaginationSize,
        this.INITIAL_SORT_NAME,
        this.INITIAL_SORT_DIR
      )
    );
    this.instances$ = this.service.resource$.pipe(
      map((instances) => new TrainingInstanceTable(instances, this.service, this.navigator))
    );
    this.hasError$ = this.service.hasError$;
    this.onInstancesLoadEvent(initLoadEvent);
  }
}
