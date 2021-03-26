import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective, RequestedPagination } from '@sentinel/common';
import { SentinelControlItem } from '@sentinel/components/controls';
import { TrainingInstance, TrainingRun } from '@muni-kypo-crp/training-model';
import { SentinelTable, LoadTableEvent, TableActionEvent } from '@sentinel/components/table';
import { defer, Observable, of, Subject } from 'rxjs';
import { map, switchMap, take, takeWhile, tap } from 'rxjs/operators';
import { TrainingInstanceSummaryControls } from '../model/training-instance-summary-controls';
import { ActiveTrainingRunTable } from '../model/active-training-run-table';
import { ArchivedTrainingRunTable } from '../model/archived-training-run-table';
import { TrainingNavigator, TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';
import { TrainingInstanceSummaryService } from '../services/state/summary/training-instance-summary.service';
import { ActiveTrainingRunService } from '../services/state/active-runs/active-training-run.service';
import { ArchivedTrainingRunService } from '../services/state/archived-runs/archived-training-run.service';

/**
 * Smart component of training instance summary
 */
@Component({
  selector: 'kypo-training-instance-summary',
  templateUrl: './training-instance-summary.component.html',
  styleUrls: ['./training-instance-summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingInstanceSummaryComponent extends SentinelBaseDirective implements OnInit {
  readonly SUMMARY_PANEL_ID = 0;
  readonly ACTIVE_TRAINING_RUNS_PANEL_ID = 1;
  readonly ARCHIVED_TRAINING_RUNS_PANEL_ID = 2;

  trainingInstance$: Observable<TrainingInstance>;
  activeTrainingRuns$: Observable<SentinelTable<TrainingRun>>;
  activeTrainingRunsHasError$: Observable<boolean>;
  archivedTrainingRuns$: Observable<SentinelTable<TrainingRun>>;
  archivedTrainingRunsHasError$: Observable<boolean>;

  trainingInstanceAccessTokenLink: string;
  trainingInstancePoolIdLink: string;
  hasPool: boolean;

  summaryControls: SentinelControlItem[];
  archivedTrainingRunsControls: SentinelControlItem[];

  selectedArchivedTrainingRunIds: number[] = [];

  private panelOpened$: Subject<number> = new Subject();
  private openPanels: Set<number> = new Set();
  private trainingInstanceId: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private navigator: TrainingNavigator,
    private trainingInstanceSummaryService: TrainingInstanceSummaryService,
    private activeTrainingRunService: ActiveTrainingRunService,
    private archivedTrainingRunService: ArchivedTrainingRunService
  ) {
    super();
  }

  ngOnInit(): void {
    this.trainingInstance$ = this.activeRoute.data.pipe(
      map((data) => data[TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]),
      tap((ti) => {
        this.initSummaryComponent(ti);
      })
    );

    this.panelOpened$
      .asObservable()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((panelId) => {
        switch (panelId) {
          case this.ACTIVE_TRAINING_RUNS_PANEL_ID: {
            this.initActiveRunOverviewComponent();
            break;
          }
          case this.ARCHIVED_TRAINING_RUNS_PANEL_ID: {
            this.initArchivedTrainingRunOverviewComponent();
            break;
          }
        }
      });
  }

  onSummaryControlAction(control: SentinelControlItem): void {
    control.result$.pipe(takeWhile(() => this.isAlive)).subscribe();
  }

  /**
   * Resolves type of action and calls handler
   * @param event action event emitted from table
   */
  onActiveTrainingRunTableAction(event: TableActionEvent<TrainingRun>): void {
    event.action.result$.pipe(take(1)).subscribe();
  }

  /**
   * Calls service to get new data for table
   * @param event reload data event emitted from table
   */
  onActiveTrainingRunTableLoadEvent(event: LoadTableEvent): void {
    this.trainingInstance$
      .pipe(
        switchMap((ti) => this.activeTrainingRunService.getAll(ti.id, event.pagination)),
        takeWhile(() => this.isAlive)
      )
      .subscribe();
  }

  /**
   * Resolves actions and calls related action handler
   * @param event event emitted by table
   */
  onArchivedTrainingRunTableAction(event: TableActionEvent<TrainingRun>): void {
    event.action.result$.pipe(take(1)).subscribe();
  }

  onArchivedTrainingRunControlsAction(control: SentinelControlItem): void {
    control.result$.pipe(takeWhile(() => this.isAlive)).subscribe();
  }

  /**
   * Stores selected training runs emitted by table
   * @param event event containing selected training runs emitted by table
   */
  onArchivedTrainingRunTableRowSelection(event: TrainingRun[]): void {
    this.selectedArchivedTrainingRunIds = [];
    event.forEach((selectedRun) => {
      this.selectedArchivedTrainingRunIds.push(selectedRun.id);
    });
    this.initArchivedTrainingRunControls();
  }

  /**
   * Loads fresh data for table
   * @param event event to load new data emitted by table
   */
  onArchivedTrainingRunTableLoadEvent(event: LoadTableEvent): void {
    this.trainingInstance$
      .pipe(
        switchMap((ti) => this.archivedTrainingRunService.getAll(ti.id, event.pagination)),
        takeWhile(() => this.isAlive)
      )
      .subscribe();
  }

  /**
   * Opens expansion panel of id
   * @param id id of expansion panel to open
   */
  openPanel(id: number): void {
    this.openPanels.add(id);
    this.panelOpened$.next(id);
  }

  /**
   * Closes expansion panel of id
   * @param id id of expansion panel to close
   */
  closePanel(id: number): void {
    this.openPanels.delete(id);
  }

  /**
   * True if expansion panel on provided id is opened, false otherwise
   * @param id id of expansion panel
   */
  panelIsOpen(id: number): boolean {
    return this.openPanels.has(id);
  }

  private initSummaryComponent(trainingInstance: TrainingInstance) {
    this.trainingInstanceId = trainingInstance.id;
    this.trainingInstanceSummaryService.init(trainingInstance);
    this.trainingInstanceAccessTokenLink = `/${this.navigator.toTrainingInstanceAccessToken(trainingInstance.id)}`;
    this.trainingInstancePoolIdLink = `/${this.navigator.toPool(trainingInstance.poolId)}`;
    this.hasPool = trainingInstance.hasPool();
    const disabled$ = this.trainingInstanceSummaryService.hasStarted$.pipe(map((hasStated) => !hasStated));
    this.summaryControls = TrainingInstanceSummaryControls.create(
      this.trainingInstanceSummaryService,
      disabled$,
      disabled$
    );
  }

  private initActiveRunOverviewComponent() {
    const initialPagination = new RequestedPagination(0, 10, '', '');
    this.trainingInstance$
      .pipe(
        take(1),
        switchMap((ti) => this.activeTrainingRunService.getAll(ti.id, initialPagination))
      )
      .subscribe();
    this.activeTrainingRuns$ = this.activeTrainingRunService.resource$.pipe(
      takeWhile(() => this.panelIsOpen(this.ACTIVE_TRAINING_RUNS_PANEL_ID)),
      map((resource) => new ActiveTrainingRunTable(resource, this.activeTrainingRunService, this.trainingInstanceId))
    );
    this.activeTrainingRunsHasError$ = this.activeTrainingRunService.hasError$;
  }

  private initArchivedTrainingRunOverviewComponent() {
    const initialPagination = new RequestedPagination(0, 10, '', '');
    this.trainingInstance$
      .pipe(
        take(1),
        switchMap((ti) => this.archivedTrainingRunService.getAll(ti.id, initialPagination))
      )
      .subscribe();
    this.archivedTrainingRuns$ = this.archivedTrainingRunService.resource$.pipe(
      takeWhile(() => this.panelIsOpen(this.ARCHIVED_TRAINING_RUNS_PANEL_ID)),
      map((resource) => new ArchivedTrainingRunTable(resource, this.archivedTrainingRunService))
    );
    this.archivedTrainingRunsHasError$ = this.archivedTrainingRunService.hasError$;
  }

  private initArchivedTrainingRunControls() {
    const deleteLabel =
      this.selectedArchivedTrainingRunIds.length > 0
        ? `Delete (${this.selectedArchivedTrainingRunIds.length})`
        : 'Delete';
    this.archivedTrainingRunsControls = [
      new SentinelControlItem(
        'deleteMultiple',
        deleteLabel,
        'warn',
        of(this.selectedArchivedTrainingRunIds.length <= 0),
        defer(() => this.archivedTrainingRunService.deleteMultiple(this.selectedArchivedTrainingRunIds))
      ),
    ];
  }
}
