import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AdaptiveRunApi, TrainingRunApi } from '@crczp/training-api';
import { AccessedTrainingRun } from '@crczp/training-model';
import { from, Observable } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { TrainingErrorHandler, TrainingNavigator } from '@crczp/training-agenda';
import { TrainingAgendaContext } from '@crczp/training-agenda/internal';
import { AccessedTrainingRunService } from './accessed-training-run.service';
import { OffsetPaginationEvent, PaginatedResource } from '@sentinel/common/pagination';
import { SentinelFilter } from '@sentinel/common/filter';

/**
 * Basic implementation of layer between component and API service.
 */
@Injectable()
export class AccessedTrainingRunConcreteService extends AccessedTrainingRunService {
    constructor(
        private trainingApi: TrainingRunApi,
        private adaptiveApi: AdaptiveRunApi,
        private router: Router,
        private context: TrainingAgendaContext,
        private navigator: TrainingNavigator,
        private errorHandler: TrainingErrorHandler,
    ) {
        super(context.config.defaultPaginationSize);
    }

    private lastFilters: string;

    /**
     * Gets paginated accessed training runs and updates related observables or handles error.
     * @param pagination requested pagination info
     * @param filter filters to be applied on resources
     */
    getAll(pagination: OffsetPaginationEvent, filter: string): Observable<PaginatedResource<AccessedTrainingRun>> {
        this.hasErrorSubject$.next(false);
        this.lastFilters = filter;
        const filters = filter ? [new SentinelFilter('title', filter)] : [];
        pagination.size = Number.MAX_SAFE_INTEGER;
        return this.trainingApi.getAccessed(pagination, filters).pipe(
            concatMap((trainingRuns) => this.getAllAdaptive(pagination, trainingRuns)),
            tap(
                (runs) => {
                    this.resourceSubject$.next(runs);
                },
                (err) => {
                    this.errorHandler.emit(err, 'Fetching training runs');
                    this.hasErrorSubject$.next(true);
                },
            ),
        );
    }

    /**
     * Resumes in already started training run or handles error.
     * @param id id of training run to resume
     */
    resumeLinear(id: number): Observable<any> {
        return from(this.router.navigate([this.navigator.toResumeTrainingRun(id)]));
    }

    resumeAdaptive(id: number): Observable<any> {
        return from(this.router.navigate([this.navigator.toResumeAdaptiveRun(id)]));
    }

    access(token: string): Observable<any> {
        return from(this.router.navigate([this.navigator.toAccessTrainingRun(token)]));
    }

    resultsLinear(id: number): Observable<any> {
        return from(this.router.navigate([this.navigator.toTrainingRunResult(id)]));
    }

    resultsAdaptive(id: number): Observable<any> {
        return from(this.router.navigate([this.navigator.toAdaptiveRunResult(id)]));
    }

    showMitreTechniques(): Observable<any> {
        return from(this.router.navigate([this.navigator.toTrainingRunMitreTechniques()]));
    }

    private getAllAdaptive(
        pagination: OffsetPaginationEvent,
        trainingRuns: PaginatedResource<AccessedTrainingRun>,
    ): Observable<PaginatedResource<AccessedTrainingRun>> {
        return this.adaptiveApi.getAccessed(pagination).pipe(
            map(
                (adaptiveRuns) => {
                    trainingRuns.elements = [...trainingRuns.elements, ...adaptiveRuns.elements];
                    return trainingRuns;
                },
                (err) => {
                    this.errorHandler.emit(err, 'Fetching adaptive runs');
                    this.hasErrorSubject$.next(true);
                },
            ),
        );
    }
}
