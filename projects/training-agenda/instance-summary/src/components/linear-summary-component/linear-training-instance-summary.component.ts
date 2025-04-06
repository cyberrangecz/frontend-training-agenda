import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffsetPaginationEvent } from '@sentinel/common/pagination';
import { TrainingInstance, TrainingRun } from '@crczp/training-model';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import {
    TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME,
    TrainingNavigator,
    TrainingNotificationService,
} from '@crczp/training-agenda';
import { SentinelTable, TableActionEvent, TableLoadEvent } from '@sentinel/components/table';
import { PaginationService } from '@crczp/training-agenda/internal';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TrainingInstanceSummaryService } from '../../services/state/summary/training-instance-summary.service';
import { TrainingRunService } from '../../services/state/runs/training-run.service';
import { TrainingRunTable } from '../../model/training-run-table';

/**
 * Smart component of training instance summary
 */
@Component({
    selector: 'crczp-linear-training-instance-summary',
    templateUrl: './linear-training-instance-summary.component.html',
    styleUrls: ['./linear-training-instance-summary.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinearTrainingInstanceSummaryComponent implements OnInit {
    @Input() paginationId = 'training-instance-summary';

    trainingInstance$: Observable<TrainingInstance>;
    hasStarted$: Observable<boolean>;
    trainingRuns$: Observable<SentinelTable<TrainingRun>>;
    trainingRunsHasError$: Observable<boolean>;

    trainingInstanceAccessTokenLink: string;
    trainingInstancePoolIdLink: string;
    trainingDefinitionLink: string;

    controls: { title: string; id: string }[] = [
        { title: 'Show Progress', id: 'progress' },
        { title: 'Show Results', id: 'results' },
        { title: 'Show Aggregated Results', id: 'aggregated-results' },
        { title: 'Cheating Detection', id: 'cheating-detection' },
        { title: 'Export Score', id: 'score' },
    ];

    destroyRef = inject(DestroyRef);

    constructor(
        private activeRoute: ActivatedRoute,
        private navigator: TrainingNavigator,
        private trainingInstanceSummaryService: TrainingInstanceSummaryService,
        private notificationService: TrainingNotificationService,
        private paginationService: PaginationService,
        private trainingRunService: TrainingRunService,
    ) {}

    ngOnInit(): void {
        this.trainingInstance$ = this.activeRoute.data.pipe(
            map((data) => data[TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]),
            tap((ti) => {
                this.initSummaryComponent(ti);
            }),
        );
        this.initTrainingRunsComponent();
    }

    /**
     * Resolves type of action and calls handler
     * @param event action event emitted from table
     */
    onTrainingRunTableAction(event: TableActionEvent<TrainingRun>): void {
        event.action.result$.pipe(take(1)).subscribe();
    }

    /**
     * Calls service to get new data for table
     * @param event reload data event emitted from table
     */
    onTrainingRunTableLoadEvent(event: TableLoadEvent): void {
        this.paginationService.setPagination(this.paginationId, event.pagination.size);
        this.trainingInstance$
            .pipe(
                switchMap((ti) =>
                    this.trainingRunService.getAll(
                        ti.id,
                        new OffsetPaginationEvent(
                            0,
                            event.pagination.size,
                            event.pagination.sort,
                            event.pagination.sortDir,
                        ),
                    ),
                ),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
    }

    onTrainingRunTableRowExpand(trainingRunId: number): void {
        this.trainingRunService.getInfo(trainingRunId).pipe();
    }

    private initSummaryComponent(trainingInstance: TrainingInstance) {
        this.trainingInstanceSummaryService.init(trainingInstance);
        this.trainingInstanceAccessTokenLink = `/${this.navigator.toTrainingInstanceAccessToken(trainingInstance.id)}`;
        this.trainingInstancePoolIdLink = `/${this.navigator.toPool(trainingInstance.poolId)}`;
        this.trainingDefinitionLink = `/${this.navigator.toTrainingDefinitionDetail(
            trainingInstance.trainingDefinition.id,
        )}`;
        this.hasStarted$ = this.trainingInstanceSummaryService.hasStarted$;
    }

    private initTrainingRunsComponent() {
        const initialPagination = new OffsetPaginationEvent(
            0,
            this.paginationService.getPagination(this.paginationId),
            '',
            'asc',
        );
        this.trainingInstance$
            .pipe(
                take(1),
                switchMap((ti) => this.trainingRunService.getAll(ti.id, initialPagination)),
            )
            .subscribe();
        this.trainingRuns$ = this.trainingRunService.resource$.pipe(
            takeUntilDestroyed(this.destroyRef),
            map((resource) => new TrainingRunTable(resource)),
        );
        this.trainingRunsHasError$ = this.trainingRunService.hasError$;
    }

    onShowProgress(): void {
        this.trainingInstanceSummaryService.showProgress();
    }

    onShowResults(): void {
        this.trainingInstanceSummaryService.showResults();
    }

    onShowAggregatedResults(): void {
        this.trainingInstanceSummaryService.showAggregatedResults();
    }

    onShowNotification(data: string[]): void {
        this.notificationService.emit(data[0] as any, data[1]);
    }

    onShowCheatingDetection(): void {
        this.trainingInstanceSummaryService.showCheatingDetection();
    }

    onExportScore(): void {
        this.trainingInstance$
            .pipe(
                switchMap((ti) => this.trainingRunService.exportScore(ti.id)),
                take(1),
            )
            .subscribe();
    }

    handleControl($event: string) {
        switch ($event) {
            case 'progress':
                return this.trainingInstanceSummaryService.showProgress();
            case 'results':
                return this.trainingInstanceSummaryService.showResults();
            case 'aggregated-results':
                return this.trainingInstanceSummaryService.showAggregatedResults();
            case 'cheating-detection':
                return this.trainingInstanceSummaryService.showCheatingDetection();
            case 'score':
                return this.onExportScore();
        }
    }
}
