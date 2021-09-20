import { Component, OnInit } from '@angular/core';
import { SentinelBaseDirective, RequestedPagination } from '@sentinel/common';
import { SentinelControlItem } from '@sentinel/components/controls';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';
import { SentinelTable, LoadTableEvent, TableActionEvent } from '@sentinel/components/table';
import { Observable } from 'rxjs';
import { map, take, takeWhile } from 'rxjs/operators';
import { TrainingDefinitionOverviewControls } from '../model/training-definition-overview-controls';
import { TrainingDefinitionTable } from '../model/training-definition-table';
import { PaginationService } from '@muni-kypo-crp/training-agenda/internal';
import { TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { TrainingDefinitionService } from '../services/state/training-definition.service';

/**
 * Main smart component of training definition overview
 */
@Component({
  selector: 'kypo-training-definition-overview',
  templateUrl: './training-definition-overview.component.html',
  styleUrls: ['./training-definition-overview.component.css'],
})
export class TrainingDefinitionOverviewComponent extends SentinelBaseDirective implements OnInit {
  readonly INIT_SORT_NAME = 'lastEdited';
  readonly INIT_SORT_DIR = 'desc';

  trainingDefinitions$: Observable<SentinelTable<TrainingDefinition>>;
  hasError$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  controls: SentinelControlItem[] = [];

  constructor(
    private trainingDefinitionService: TrainingDefinitionService,
    private paginationService: PaginationService,
    private navigator: TrainingNavigator
  ) {
    super();
  }

  ngOnInit(): void {
    this.controls = TrainingDefinitionOverviewControls.create(this.trainingDefinitionService);
    this.initTable();
  }

  /**
   * Gets new data for table
   * @param loadEvent event emitted by table component to get new data
   */
  onLoadEvent(loadEvent: LoadTableEvent): void {
    this.paginationService.setPagination(loadEvent.pagination.size);
    this.trainingDefinitionService
      .getAll(loadEvent.pagination, loadEvent.filter)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe();
  }

  /**
   * Resolves controls action and calls appropriate handler
   * @param control selected control emitted by controls component
   */
  onControlsAction(control: SentinelControlItem): void {
    control.result$.pipe(take(1)).subscribe();
  }

  /**
   * Resolves type of emitted event and calls appropriate handler
   * @param event action event emitted from table component
   */
  onTableAction(event: TableActionEvent<TrainingDefinition>): void {
    event.action.result$.pipe(take(1)).subscribe();
  }

  private initTable() {
    this.hasError$ = this.trainingDefinitionService.hasError$;
    this.isLoading$ = this.trainingDefinitionService.isLoading$;
    this.trainingDefinitions$ = this.trainingDefinitionService.resource$.pipe(
      map((resource) => new TrainingDefinitionTable(resource, this.trainingDefinitionService, this.navigator))
    );
    const initialPagination = new RequestedPagination(
      0,
      this.paginationService.getPagination(),
      this.INIT_SORT_NAME,
      this.INIT_SORT_DIR
    );
    this.onLoadEvent(new LoadTableEvent(initialPagination, null));
  }
}
