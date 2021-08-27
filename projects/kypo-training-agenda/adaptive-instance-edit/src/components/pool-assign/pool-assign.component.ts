import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SentinelBaseDirective, PaginatedResource, RequestedPagination } from '@sentinel/common';
import { SentinelControlItem } from '@sentinel/components/controls';
import { Pool } from '@muni-kypo-crp/sandbox-model';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { map, take, takeWhile, tap } from 'rxjs/operators';
import { TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { TrainingAgendaContext } from '@muni-kypo-crp/training-agenda/internal';
import { PoolAssignConcreteService } from '../../services/state/pool-assign/pool-assign-concrete.service';
import { PoolAssignService } from '../../services/state/pool-assign/pool-assign.service';
import { SandboxPoolListAdapter } from '../../models/adapter/sandbox-pool-list-adapter';

@Component({
  selector: 'kypo-pool-assign',
  templateUrl: './pool-assign.component.html',
  styleUrls: ['./pool-assign.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: PoolAssignService, useClass: PoolAssignConcreteService }],
})
export class PoolAssignComponent extends SentinelBaseDirective implements OnInit, OnChanges {
  readonly PAGE_SIZE: number;

  @Input() trainingInstance: TrainingInstance;
  @Input() hasAssignedPool: boolean;
  @Output() poolChanged: EventEmitter<TrainingInstance> = new EventEmitter();
  @Output() onSelectionChanged: EventEmitter<number> = new EventEmitter();

  pools$: Observable<SandboxPoolListAdapter[]>;
  hasError$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  poolDetailRoute: string;
  hasPool$: Observable<boolean>;
  selectedPool: string;

  constructor(
    private assignService: PoolAssignService,
    private context: TrainingAgendaContext,
    private navigator: TrainingNavigator
  ) {
    super();
    this.PAGE_SIZE = this.context.config.defaultPaginationSize;
  }

  ngOnInit(): void {
    this.initList();
    this.hasPool$ = this.assignService.assignedPool$.pipe(
      takeWhile(() => this.isAlive),
      tap((poolId) => this.onPoolChanged(poolId)),
      map((poolId) => poolId !== undefined && poolId !== null)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('trainingInstance' in changes) {
      this.assignService.init(this.trainingInstance);
      this.createPoolDetailRoute(this.trainingInstance.poolId);
    }
  }

  onControlsAction(controlItem: SentinelControlItem): void {
    controlItem.result$.pipe(take(1)).subscribe();
  }

  fetch(pagination: RequestedPagination): void {
    this.assignService.getAll(pagination).pipe(take(1)).subscribe();
  }

  onSelectionChange(poolTitle: string): void {
    if (poolTitle) {
      this.onSelectionChanged.emit(Number(poolTitle.replace(/[^0-9]/g, '')));
    } else {
      this.onSelectionChanged.emit(null);
    }
    this.onSelectionChanged.emit(Number(poolTitle.replace(/[^0-9]/g, '')));
  }

  private initList() {
    const pagination = new RequestedPagination(0, this.PAGE_SIZE, '', '');
    this.pools$ = this.assignService.resource$.pipe(
      map((resource) => this.mapToAdapter(resource)),
      tap((pools) => {
        const pool = pools.find((pool) => pool.id === this.trainingInstance.poolId);
        if (pool) {
          this.selectedPool = pool.title;
        }
      })
    );
    this.assignService.getAll(pagination).pipe(take(1)).subscribe();
  }

  private onPoolChanged(poolId: number) {
    this.trainingInstance.poolId = poolId;
    this.poolChanged.emit(this.trainingInstance);
    this.createPoolDetailRoute(poolId);
  }

  private mapToAdapter(resource: PaginatedResource<Pool>): SandboxPoolListAdapter[] {
    return resource.elements.map((pool) => {
      const adapter = pool as SandboxPoolListAdapter;
      adapter.title = !adapter.isLocked() ? `Pool ${adapter.id}` : `Pool ${adapter.id} (locked)`;
      return adapter;
    });
  }

  private createPoolDetailRoute(poolId: number) {
    this.poolDetailRoute = `/${this.navigator.toPool(poolId)}`;
  }
}
