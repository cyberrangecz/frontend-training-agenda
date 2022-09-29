import { OffsetPaginationEvent, SentinelBaseDirective } from '@sentinel/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TableLoadEvent, SentinelTable, TableActionEvent } from '@sentinel/components/table';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { SentinelControlItem } from '@sentinel/components/controls';
import { map, take, takeWhile } from 'rxjs/operators';
import { AdaptiveInstanceOverviewService } from '../services/state/adaptive-instance-overview.service';
import { TrainingNavigator, TrainingNotificationService } from '@muni-kypo-crp/training-agenda';
import { PaginationService } from '@muni-kypo-crp/training-agenda/internal';
import { AdaptiveInstanceOverviewControls } from '../model/adapters/adaptive-instance-overview-controls';
import { AdaptiveInstanceTable } from '../model/adapters/adaptive-instance-table';

@Component({
  selector: 'kypo-adaptive-instance-overview',
  templateUrl: './adaptive-instance-overview.component.html',
  styleUrls: ['./adaptive-instance-overview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdaptiveInstanceOverviewComponent extends SentinelBaseDirective implements OnInit, OnDestroy {
  readonly INITIAL_SORT_NAME = 'startTime';
  readonly INITIAL_SORT_DIR = 'desc';

  instances$: Observable<SentinelTable<TrainingInstance>>;
  hasError$: Observable<boolean>;

  controls: SentinelControlItem[];

  constructor(
    private service: AdaptiveInstanceOverviewService,
    private paginationService: PaginationService,
    private navigator: TrainingNavigator,
    private notificationService: TrainingNotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.controls = AdaptiveInstanceOverviewControls.create(this.service);
    this.initTable();
  }

  onControlAction(control: SentinelControlItem): void {
    control.result$.pipe(takeWhile(() => this.isAlive)).subscribe();
  }

  onInstancesLoadEvent(loadEvent: TableLoadEvent): void {
    this.paginationService.setPagination(loadEvent.pagination.size);
    this.service
      .getAll(
        new OffsetPaginationEvent(
          0,
          loadEvent.pagination.size,
          loadEvent.pagination.sort,
          loadEvent.pagination.sortDir
        ),
        loadEvent.filter
      )
      .pipe(takeWhile(() => this.isAlive))
      .subscribe();
  }

  onInstanceAction(event: TableActionEvent<any>): void {
    event.action.result$.pipe(take(1)).subscribe();
  }

  private initTable() {
    const initLoadEvent: TableLoadEvent = {
      pagination: new OffsetPaginationEvent(
        0,
        this.paginationService.getPagination(),
        this.INITIAL_SORT_NAME,
        this.INITIAL_SORT_DIR
      ),
    };
    this.instances$ = this.service.resource$.pipe(
      map((instances) => new AdaptiveInstanceTable(instances, this.service, this.navigator))
    );
    this.hasError$ = this.service.hasError$;
    this.onInstancesLoadEvent(initLoadEvent);
  }

  onCopyToken(): void {
    this.notificationService.emit('success', 'Access token has been copied');
  }

  getAccessTokenTooltip(freeSandboxes: string, localEnvironment: boolean, poolSize: string) {
    if (!localEnvironment) {
      if (freeSandboxes === '') {
        if (poolSize === '-') {
          return 'Cannot copy access token, because assigned pool does not exist.';
        }
        return 'Cannot copy access token, because there is no pool assigned.';
      } else if (freeSandboxes === '0') {
        return 'Cannot copy access token because there is no free sandbox.';
      }
    }
    return 'Click to copy access token';
  }
}
