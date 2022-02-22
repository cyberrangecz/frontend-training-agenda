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
import { SentinelBaseDirective, PaginatedResource, OffsetPaginationEvent } from '@sentinel/common';
import { Pool } from '@muni-kypo-crp/sandbox-model';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { map, take, takeWhile, tap } from 'rxjs/operators';
import { TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { TrainingAgendaContext } from '@muni-kypo-crp/training-agenda/internal';
import { SandboxPoolListAdapter } from '../../models/adapter/sandbox-pool-list-adapter';
import { AdaptiveInstanceEditService } from '../../services/state/edit/adaptive-instance-edit.service';

@Component({
  selector: 'kypo-pool-assign',
  templateUrl: './pool-assign.component.html',
  styleUrls: ['./pool-assign.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoolAssignComponent extends SentinelBaseDirective implements OnInit, OnChanges {
  readonly PAGE_SIZE: number;

  @Input() trainingInstance: TrainingInstance;
  @Input() hasAssignedPool: boolean;
  @Output() poolChanged: EventEmitter<TrainingInstance> = new EventEmitter();
  @Output() selectionChanged: EventEmitter<number> = new EventEmitter();

  pools$: Observable<SandboxPoolListAdapter[]>;
  hasError$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  poolDetailRoute: string;
  hasPool$: Observable<boolean>;
  selectedPool: string;

  constructor(
    private editService: AdaptiveInstanceEditService,
    private context: TrainingAgendaContext,
    private navigator: TrainingNavigator
  ) {
    super();
    this.PAGE_SIZE = this.context.config.defaultPaginationSize;
  }

  ngOnInit(): void {
    this.initList();
    this.hasPool$ = this.editService.assignedPool$.pipe(
      takeWhile(() => this.isAlive),
      tap((poolId) => this.onPoolChanged(poolId)),
      map((poolId) => poolId !== undefined && poolId !== null)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('trainingInstance' in changes) {
      this.editService.init(this.trainingInstance);
      this.createPoolDetailRoute(this.trainingInstance.poolId);
    }
  }

  fetch(pagination: OffsetPaginationEvent): void {
    this.editService.getAll(pagination).pipe(take(1)).subscribe();
  }

  onSelectionChange(poolTitle: string): void {
    if (poolTitle) {
      this.selectionChanged.emit(Number(poolTitle.replace(/[^0-9]/g, '')));
    } else {
      this.selectionChanged.emit(null);
    }
  }

  private initList() {
    const pagination = new OffsetPaginationEvent(0, this.PAGE_SIZE, '', '');
    this.pools$ = this.editService.pools$.pipe(
      map((resource) => this.mapToAdapter(resource)),
      tap((pools) => {
        const pool = pools.find((pool) => pool.id === this.trainingInstance.poolId);
        if (pool) {
          this.selectedPool = pool.title;
        }
      })
    );
    this.editService.getAll(pagination).pipe(take(1)).subscribe();
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
