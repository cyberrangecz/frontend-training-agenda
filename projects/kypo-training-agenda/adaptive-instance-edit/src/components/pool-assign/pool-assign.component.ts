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
import { SentinelListResourceMapping } from '@sentinel/components/list';
import { Pool } from '@muni-kypo-crp/sandbox-model';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { map, take, takeWhile, tap } from 'rxjs/operators';
import { TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { TrainingAgendaContext } from '@muni-kypo-crp/training-agenda/internal';
import { PoolAssignConcreteService } from '../../services/state/pool-assign/pool-assign-concrete.service';
import { PoolAssignService } from '../../services/state/pool-assign/pool-assign.service';
import { PoolAssignControls } from '../../models/adapter/pool-assign-controls';
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
  @Output() poolChanged: EventEmitter<TrainingInstance> = new EventEmitter();

  pools$: Observable<PaginatedResource<Pool>>;
  hasError$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  selected$: Observable<Pool[]>;

  controls: SentinelControlItem[];
  resourceMapping: SentinelListResourceMapping = { id: 'id', title: 'title' };
  poolDetailRoute: string;
  hasPool$: Observable<boolean>;

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
    this.initControls();
    this.hasPool$ = this.assignService.assignedPool$.pipe(
      takeWhile(() => this.isAlive),
      tap((poolId) => this.onPoolChanged(poolId)),
      map((poolId) => poolId !== undefined && poolId !== null)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('trainingInstance' in changes) {
      this.assignService.init(this.trainingInstance);
      this.initControls();
      this.createPoolDetailRoute(this.trainingInstance.poolId);
    }
  }

  onControlsAction(controlItem: SentinelControlItem): void {
    controlItem.result$.pipe(take(1)).subscribe();
  }

  fetch(pagination: RequestedPagination): void {
    this.assignService.getAll(pagination).pipe(take(1)).subscribe();
  }

  onSelectionChange(selected: Pool[]): void {
    this.assignService.select(selected[0]);
  }

  private initList() {
    const pagination = new RequestedPagination(0, this.PAGE_SIZE, '', '');
    this.pools$ = this.assignService.resource$.pipe(map((resource) => this.mapToAdapter(resource)));
    this.hasError$ = this.assignService.hasError$;
    this.isLoading$ = this.assignService.isLoading$;
    this.selected$ = this.assignService.selected$.pipe(map((selected) => (selected ? [selected] : [])));
    this.assignService.getAll(pagination).pipe(take(1)).subscribe();
  }

  private onPoolChanged(poolId: number) {
    this.trainingInstance.poolId = poolId;
    this.poolChanged.emit(this.trainingInstance);
    this.createPoolDetailRoute(poolId);
    this.initControls();
  }

  private initControls() {
    this.controls = PoolAssignControls.create(this.assignService, this.trainingInstance);
  }

  private mapToAdapter(resource: PaginatedResource<Pool>): PaginatedResource<SandboxPoolListAdapter> {
    const adapterElements = resource.elements.map((pool) => {
      const adapter = pool as SandboxPoolListAdapter;
      adapter.title = !adapter.isLocked() ? `Pool ${adapter.id}` : `Pool ${adapter.id} (locked)`;
      return adapter;
    });
    return new PaginatedResource<SandboxPoolListAdapter>(adapterElements, resource.pagination);
  }

  private createPoolDetailRoute(poolId: number) {
    this.poolDetailRoute = `/${this.navigator.toPool(poolId)}`;
  }
}
