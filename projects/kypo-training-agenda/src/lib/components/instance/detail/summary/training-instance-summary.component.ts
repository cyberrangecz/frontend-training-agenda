import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KypoBaseComponent, KypoRequestedPagination } from 'kypo-common';
import { KypoControlItem } from 'kypo-controls';
import { TrainingInstance, TrainingRun } from 'kypo-training-model';
import { Kypo2Table, LoadTableEvent } from 'kypo2-table';
import { TableActionEvent } from 'kypo2-table/lib/model/table-action-event';
import { defer, Observable, of, Subject } from 'rxjs';
import { map, switchMap, take, takeWhile, tap } from 'rxjs/operators';
import { TrainingInstanceSummaryControls } from '../../../../model/adapters/controls/instance/training-instance-summary-controls';
import { TrainingRunRowAdapter } from '../../../../model/adapters/table/rows/training-run-row-adapter';
import { ActiveTrainingRunTable } from '../../../../model/adapters/table/training-run/active-training-run-table';
import { ArchivedTrainingRunTable } from '../../../../model/adapters/table/training-run/archived-training-run-table';
import { TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME } from '../../../../model/client/activated-route-data-attributes';
import { TrainingNavigator } from '../../../../services/client/training-navigator.service';
import { TrainingInstanceSummaryService } from '../../../../services/training-instance/summary/training-instance-summary.service';
import { ActiveTrainingRunService } from '../../../../services/training-run/active/active-training-run.service';
import { ArchivedTrainingRunService } from '../../../../services/training-run/archived/archived-training-run.service';

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
  readonly SUMMARY_PANEL_ID = 0;
  readonly ACTIVE_TRAINING_RUNS_PANEL_ID = 1;
  readonly ARCHIVED_TRAINING_RUNS_PANEL_ID = 2;

  trainingInstance$: Observable<TrainingInstance>;
  activeTrainingRuns$: Observable<Kypo2Table<TrainingRun>>;
  activeTrainingRunsHasError$: Observable<boolean>;
  archivedTrainingRuns$: Observable<Kypo2Table<TrainingRun>>;
  archivedTrainingRunsHasError$: Observable<boolean>;

  trainingInstanceAccessTokenLink: string;
  trainingInstancePoolIdLink: string;

  summaryControls: KypoControlItem[];
  archivedTrainingRunsControls: KypoControlItem[];

  selectedArchivedTrainingRunIds: number[] = [];

  private panelOpened$: Subject<number> = new Subject();
  private openPanels: Set<number> = new Set();

  constructor(
    private activeRoute: ActivatedRoute,
    private navigator: TrainingNavigator,
    private trainingInstanceSummaryService: TrainingInstanceSummaryService,
    private activeTrainingRunService: ActiveTrainingRunService,
    private archivedTrainingRunService: ArchivedTrainingRunService
  ) {
    super();
  }

  ngOnInit() {
    this.trainingInstance$ = this.activeRoute.data.pipe(
      map((data) => data[TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]),
      tap((ti) => {
        this.initSummaryComponent(ti);
      })
    );

    this.panelOpened$
      .asObservable()
      .pipe(takeWhile((_) => this.isAlive))
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

  onSummaryControlAction(control: KypoControlItem) {
    control.result$.pipe(takeWhile((_) => this.isAlive)).subscribe();
  }

  /**
   * Resolves type of action and calls handler
   * @param event action event emitted from table
   */
  onActiveTrainingRunTableAction(event: TableActionEvent<TrainingRun>) {
    event.action.result$.pipe(take(1)).subscribe();
  }

  /**
   * Calls service to get new data for table
   * @param event reload data event emitted from table
   */
  onActiveTrainingRunTableLoadEvent(event: LoadTableEvent) {
    this.trainingInstance$
      .pipe(
        switchMap((ti) => this.activeTrainingRunService.getAll(ti.id, event.pagination)),
        takeWhile((_) => this.isAlive)
      )
      .subscribe();
  }

  /**
   * Resolves actions and calls related action handler
   * @param event event emitted by table
   */
  onArchivedTrainingRunTableAction(event: TableActionEvent<TrainingRun>) {
    event.action.result$.pipe(take(1)).subscribe();
  }

  onArchivedTrainingRunControlsAction(control: KypoControlItem) {
    control.result$.pipe(takeWhile((_) => this.isAlive)).subscribe();
  }

  /**
   * Stores selected training runs emitted by table
   * @param event event containing selected training runs emitted by table
   */
  onArchivedTrainingRunTableRowSelection(event: TrainingRun[]) {
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
  onArchivedTrainingRunTableLoadEvent(event: LoadTableEvent) {
    this.trainingInstance$
      .pipe(
        switchMap((ti) => this.archivedTrainingRunService.getAll(ti.id, event.pagination)),
        takeWhile((_) => this.isAlive)
      )
      .subscribe();
  }

  /**
   * Opens expansion panel of id
   * @param id id of expansion panel to open
   */
  openPanel(id: number) {
    this.openPanels.add(id);
    this.panelOpened$.next(id);
  }

  /**
   * Closes expansion panel of id
   * @param id id of expansion panel to close
   */
  closePanel(id: number) {
    this.openPanels.delete(id);
  }

  /**
   * True if expansion panel on provided id is opened, false otherwise
   * @param id id of expansion panel
   */
  panelIsOpen(id: number): boolean {
    return this.openPanels.has(id);
  }

  private initSummaryComponent(trainingInstance) {
    this.trainingInstanceSummaryService.init(trainingInstance);
    this.trainingInstanceAccessTokenLink = `/${this.navigator.toTrainingInstanceAccessToken(trainingInstance.id)}`;
    this.trainingInstancePoolIdLink = `/${this.navigator.toPool(trainingInstance.poolId)}`;

    const disabled$ = this.trainingInstanceSummaryService.hasStarted$.pipe(map((hasStated) => !hasStated));
    this.summaryControls = TrainingInstanceSummaryControls.create(
      this.trainingInstanceSummaryService,
      disabled$,
      disabled$
    );
  }

  private initActiveRunOverviewComponent() {
    const initialPagination = new KypoRequestedPagination(0, 10, '', '');
    this.trainingInstance$
      .pipe(
        take(1),
        switchMap((ti) => this.activeTrainingRunService.getAll(ti.id, initialPagination))
      )
      .subscribe();
    this.activeTrainingRuns$ = this.activeTrainingRunService.resource$.pipe(
      takeWhile((_) => this.panelIsOpen(this.ACTIVE_TRAINING_RUNS_PANEL_ID)),
      map((resource) => new ActiveTrainingRunTable(resource, this.activeTrainingRunService))
    );
    this.activeTrainingRunsHasError$ = this.activeTrainingRunService.hasError$;
  }

  private initArchivedTrainingRunOverviewComponent() {
    const initialPagination = new KypoRequestedPagination(0, 10, '', '');
    this.trainingInstance$
      .pipe(
        take(1),
        switchMap((ti) => this.archivedTrainingRunService.getAll(ti.id, initialPagination))
      )
      .subscribe();
    this.archivedTrainingRuns$ = this.archivedTrainingRunService.resource$.pipe(
      takeWhile((_) => this.panelIsOpen(this.ARCHIVED_TRAINING_RUNS_PANEL_ID)),
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
      new KypoControlItem(
        'deleteMultiple',
        deleteLabel,
        'warn',
        of(this.selectedArchivedTrainingRunIds.length <= 0),
        defer(() => this.archivedTrainingRunService.deleteMultiple(this.selectedArchivedTrainingRunIds))
      ),
    ];
  }
}
