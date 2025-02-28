import { Injectable } from '@angular/core';
import { DetectionEventApi } from '@crczp/training-api';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TrainingAgendaContext } from '@crczp/training-agenda/internal';
import { TrainingErrorHandler, TrainingNavigator, TrainingNotificationService } from '@crczp/training-agenda';
import { DetectionEventService } from './detection-event.service';
import { OffsetPaginationEvent, PaginatedResource } from '@sentinel/common/pagination';
import { from, Observable } from 'rxjs';
import { AbstractDetectionEvent } from '@crczp/training-model';
import { tap } from 'rxjs/operators';
import { DetectionEventFilter } from '../model/detection-event-filter';

/**
 * Basic implementation of a layer between a component and an API services.
 * Can get cheating detections and perform various operations to modify them
 */
@Injectable()
export class DetectionEventConcreteService extends DetectionEventService {
    constructor(
        private api: DetectionEventApi,
        private dialog: MatDialog,
        private router: Router,
        private context: TrainingAgendaContext,
        private navigator: TrainingNavigator,
        private notificationService: TrainingNotificationService,
        private errorHandler: TrainingErrorHandler,
    ) {
        super(context.config.defaultPaginationSize);
    }

    private lastPagination: OffsetPaginationEvent;

    /**
     * Gets all detection events with passed pagination and filter and updates related observables or handles an error
     * @param cheatingDetectionId the cheating detection id
     * @param trainingInstanceId the training instance id
     * @param pagination requested pagination
     * @param filter to be applied
     */
    public getAll(
        cheatingDetectionId: number,
        trainingInstanceId: number,
        pagination: OffsetPaginationEvent,
        filter: string = null,
    ): Observable<PaginatedResource<AbstractDetectionEvent>> {
        const filters = filter ? [new DetectionEventFilter(filter)] : [];
        return this.api.getAll(pagination, cheatingDetectionId, trainingInstanceId, filters).pipe(
            tap(
                (events) => {
                    this.resourceSubject$.next(events);
                },
                () => this.onGetAllError(),
            ),
        );
    }

    /**
     * Moves to the detection event detail page
     * @param trainingInstanceId the training instance id
     * @param cheatingDetectionId the cheating detection id
     * @param detectionEventId the id of detection event
     */
    toDetectionEventDetail(
        trainingInstanceId: number,
        cheatingDetectionId: number,
        detectionEventId: number,
    ): Observable<any> {
        return from(
            this.router.navigate([
                this.navigator.toTrainingInstanceCheatingDetectionEventDetail(
                    trainingInstanceId,
                    cheatingDetectionId,
                    detectionEventId,
                ),
            ]),
        );
    }

    private onGetAllError() {
        this.hasErrorSubject$.next(true);
    }
}
