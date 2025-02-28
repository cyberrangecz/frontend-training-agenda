import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { OffsetPaginationEvent } from '@sentinel/common/pagination';
import { SentinelControlItem } from '@sentinel/components/controls';
import { TrainingDefinition } from '@crczp/training-model';
import { SentinelTable, TableActionEvent, TableLoadEvent } from '@sentinel/components/table';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { TrainingDefinitionOverviewControls } from '../model/training-definition-overview-controls';
import { TrainingDefinitionTable } from '../model/training-definition-table';
import { AdaptiveDefinitionService } from '../services/state/adaptive-definition.service';
import { PaginationService } from '@crczp/training-agenda/internal';
import { TrainingNavigator } from '@crczp/training-agenda';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Main smart component of training definition overview
 */
@Component({
    selector: 'crczp-adaptive-definition-overview',
    templateUrl: './adaptive-definition-overview.component.html',
    styleUrls: ['./adaptive-definition-overview.component.css'],
})
export class AdaptiveDefinitionOverviewComponent implements OnInit {
    @Input() paginationId = 'adaptive-definition-overview';
    readonly INIT_SORT_NAME = 'lastEdited';
    readonly INIT_SORT_DIR = 'desc';

    trainingDefinitions$: Observable<SentinelTable<TrainingDefinition>>;
    hasError$: Observable<boolean>;
    isLoading$: Observable<boolean>;
    topControls: SentinelControlItem[] = [];
    bottomControls: SentinelControlItem[] = [];
    destroyRef = inject(DestroyRef);

    constructor(
        private paginationService: PaginationService,
        private trainingDefinitionService: AdaptiveDefinitionService,
        private trainingNavigator: TrainingNavigator,
    ) {}

    ngOnInit(): void {
        this.topControls = TrainingDefinitionOverviewControls.createTopControls(this.trainingDefinitionService);
        this.bottomControls = TrainingDefinitionOverviewControls.createBottomControls(this.trainingDefinitionService);
        this.initTable();
    }

    /**
     * Gets new data for table
     * @param loadEvent event emitted by table component to get new data
     */
    onLoadEvent(loadEvent: TableLoadEvent): void {
        this.paginationService.setPagination(this.paginationId, loadEvent.pagination.size);
        loadEvent.pagination.size = this.paginationService.getPagination(this.paginationId);
        this.trainingDefinitionService
            .getAll(
                new OffsetPaginationEvent(
                    0,
                    loadEvent.pagination.size,
                    loadEvent.pagination.sort,
                    loadEvent.pagination.sortDir,
                ),
                loadEvent.filter,
            )
            .pipe(takeUntilDestroyed(this.destroyRef))
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
            map(
                (resource) =>
                    new TrainingDefinitionTable(resource, this.trainingDefinitionService, this.trainingNavigator),
            ),
        );
        const initialPagination = new OffsetPaginationEvent(
            0,
            this.paginationService.getPagination(this.paginationId),
            this.INIT_SORT_NAME,
            this.INIT_SORT_DIR,
        );
        this.onLoadEvent({ pagination: initialPagination });
    }
}
