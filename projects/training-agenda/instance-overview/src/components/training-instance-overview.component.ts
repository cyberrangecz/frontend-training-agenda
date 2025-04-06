import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit, TemplateRef } from '@angular/core';
import { OffsetPaginationEvent, SortDir } from '@sentinel/common/pagination';
import { SentinelControlItem } from '@sentinel/components/controls';
import { TrainingInstance } from '@crczp/training-model';
import { SentinelTable, TableActionEvent, TableLoadEvent } from '@sentinel/components/table';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { TrainingNotificationService } from '@crczp/training-agenda';
import { TrainingInstanceOverviewService } from '../services/state/training-instance-overview.service';
import { PaginationService } from '@crczp/training-agenda/internal';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TrainingInstanceRowAdapter } from '../model/adapters/training-instance-row-adapter';

/**
 * Main component of organizer overview.
 */
@Component({
    selector: 'crczp-training-instance-overview',
    templateUrl: './training-instance-overview.component.html',
    styleUrls: ['./training-instance-overview.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingInstanceOverviewComponent implements OnInit {
    @Input() paginationId = 'training-instance-overview';
    @Input({ required: true }) table: Observable<SentinelTable<TrainingInstanceRowAdapter>>;
    @Input({ required: true }) controlsSupplier: () => SentinelControlItem[];

    @Input() initialSortName = 'startTime';
    @Input() initialSortDirection: SortDir = 'desc';

    @Input() sentinelRowTemplates: { name: string; template: TemplateRef<{ $implicit: Element }> }[] = [];

    instances$: Observable<SentinelTable<TrainingInstance>>;
    hasError$: Observable<boolean>;
    destroyRef = inject(DestroyRef);

    controls: SentinelControlItem[];

    constructor(
        private service: TrainingInstanceOverviewService,
        private paginationService: PaginationService,
        private notificationService: TrainingNotificationService,
    ) {}

    ngOnInit() {
        this.controls = this.controlsSupplier();
        this.initTable();
    }

    onControlAction(control: SentinelControlItem): void {
        control.result$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }

    onInstancesLoadEvent(loadEvent: TableLoadEvent): void {
        this.paginationService.setPagination(this.paginationId, loadEvent.pagination.size);
        this.service
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

    onInstanceAction(event: TableActionEvent<any>): void {
        event.action.result$.pipe(take(1)).subscribe();
    }

    private initTable() {
        const initLoadEvent: TableLoadEvent = {
            pagination: new OffsetPaginationEvent(
                0,
                this.paginationService.getPagination(this.paginationId),
                this.initialSortName,
                this.initialSortDirection,
            ),
        };
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

    protected readonly name = name;
}
