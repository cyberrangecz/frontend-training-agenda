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
import { KypoBaseComponent, KypoPaginatedResource, KypoRequestedPagination } from 'kypo-common';
import { KypoControlItem } from 'kypo-controls';
import { KypoListResourceMapping } from 'kypo-list';
import { Pool } from 'kypo-sandbox-model';
import { TrainingInstance } from 'kypo-training-model';
import { Observable } from 'rxjs';
import { map, take, takeWhile, tap } from 'rxjs/operators';
import { PoolAssignControls } from '../../../../model/adapters/controls/instance/pool-assign-controls';
import { SandboxPoolListAdapter } from '../../../../model/adapters/list/sandbox-pool-list-adapter';
import { TrainingNavigator } from '../../../../services/client/training-navigator.service';
import { TrainingAgendaContext } from '../../../../services/internal/training-agenda-context.service';
import { PoolAssignConcreteService } from '../../../../services/training-instance/pool-assign/pool-assign-concrete.service';
import { PoolAssignService } from '../../../../services/training-instance/pool-assign/pool-assign.service';

@Component({
  selector: 'kypo-pool-assign',
  templateUrl: './pool-assign.component.html',
  styleUrls: ['./pool-assign.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: PoolAssignService, useClass: PoolAssignConcreteService }],
})
export class PoolAssignComponent extends KypoBaseComponent implements OnInit, OnChanges {
  readonly PAGE_SIZE: number;

  @Input() trainingInstance: TrainingInstance;
  @Output() poolChanged: EventEmitter<TrainingInstance> = new EventEmitter();

  pools$: Observable<KypoPaginatedResource<SandboxPoolListAdapter>>;
  hasError$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  selected$: Observable<Pool[]>;

  controls: KypoControlItem[];
  resourceMapping: KypoListResourceMapping = { id: 'id', title: 'title' };
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
      takeWhile((_) => this.isAlive),
      tap((poolId) => this.onPoolChanged(poolId)),
      map((poolId) => poolId !== undefined && poolId !== null)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('trainingInstance' in changes) {
      this.assignService.init(this.trainingInstance);
      this.initControls();
      this.poolDetailRoute = `/${this.navigator.toPool(this.trainingInstance.poolId)}`;
    }
  }

  onControlsAction(controlItem: KypoControlItem) {
    controlItem.result$.pipe(take(1)).subscribe();
  }

  fetch(pagination: KypoRequestedPagination) {
    this.assignService.getAll(pagination).pipe(take(1)).subscribe();
  }

  onSelectionChange(selected: Pool[]) {
    this.assignService.select(selected[0]);
  }

  private initList() {
    const pagination = new KypoRequestedPagination(0, this.PAGE_SIZE, '', '');
    this.pools$ = this.assignService.resource$.pipe(map((resource) => this.mapToAdapter(resource)));
    this.hasError$ = this.assignService.hasError$;
    this.isLoading$ = this.assignService.isLoading$;
    this.selected$ = this.assignService.selected$.pipe(map((selected) => (selected ? [selected] : [])));
    this.assignService.getAll(pagination).pipe(take(1)).subscribe();
  }

  private onPoolChanged(poolId: number) {
    this.trainingInstance.poolId = poolId;
    this.poolChanged.emit(this.trainingInstance);
    this.initControls();
  }

  private initControls() {
    this.controls = PoolAssignControls.create(this.assignService, this.trainingInstance);
  }

  private mapToAdapter(resource: KypoPaginatedResource<Pool>): KypoPaginatedResource<SandboxPoolListAdapter> {
    const adapterElements = resource.elements.map((pool) => {
      const adapter = pool as SandboxPoolListAdapter;
      adapter.title = !adapter.isLocked() ? `Pool ${adapter.id}` : `Pool ${adapter.id} (locked)`;
      return adapter;
    });
    return new KypoPaginatedResource<SandboxPoolListAdapter>(adapterElements, resource.pagination);
  }
}
