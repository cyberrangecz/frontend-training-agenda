import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  SentinelConfirmationDialogComponent,
  SentinelConfirmationDialogConfig,
  SentinelDialogResultEnum,
} from '@sentinel/components/dialogs';
import { PaginatedResource, OffsetPaginationEvent } from '@sentinel/common/pagination';
import { CheatingDetectionApi } from '@muni-kypo-crp/training-api';
import { CheatingDetection } from '@muni-kypo-crp/training-model';
import { EMPTY, from, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TrainingErrorHandler, TrainingNavigator, TrainingNotificationService } from '@muni-kypo-crp/training-agenda';
import { TrainingAgendaContext } from '@muni-kypo-crp/training-agenda/internal';
import { CheatingDetectionService } from './cheating-detection.service';

/**
 * Basic implementation of a layer between a component and an API services.
 * Can get cheating detections and perform various operations to modify them
 */
@Injectable()
export class CheatingDetectionConcreteService extends CheatingDetectionService {
  constructor(
    private api: CheatingDetectionApi,
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
  private lastFilters: string;

  /**
   * Gets all cheating detections with passed pagination and filter and updates related observables or handles an error
   * @param trainingInstanceId training instance id
   * @param pagination requested pagination
   */
  getAll(
    trainingInstanceId: number,
    pagination: OffsetPaginationEvent,
  ): Observable<PaginatedResource<CheatingDetection>> {
    return this.api.getAll(pagination, trainingInstanceId).pipe(
      tap(
        (detections) => {
          this.resourceSubject$.next(detections);
        },
        () => this.onGetAllError(),
      ),
    );
  }

  /**
   * Moves to a page for cheating detection creation
   * @param trainingInstanceId
   */
  toCreatePage(trainingInstanceId: number): Observable<boolean> {
    return from(this.router.navigate([this.navigator.toTrainingInstanceCheatingDetectionCreate(trainingInstanceId)]));
  }

  /**
   * Moves to a page for cheating detection events summary
   * @param trainingInstanceId the training instance id
   * @param cheatingDetectionId the cheating detection id
   */
  toDetectionEventsOfCheatingDetection(trainingInstanceId: number, cheatingDetectionId: number): Observable<any> {
    return from(
      this.router.navigate([
        this.navigator.toTrainingInstanceCheatingDetectionEvents(trainingInstanceId, cheatingDetectionId),
      ]),
    );
  }

  /**
   * Displays dialog to delete cheating detections and informs about the result and optionally
   * updates list of cheating detections or handles an error
   * @param cheatingDetectionId cheating detection to be deleted
   */
  delete(cheatingDetectionId: number, trainingInstanceId: number): Observable<any> {
    return this.displayDialogToDelete(cheatingDetectionId).pipe(
      switchMap((result) =>
        result === SentinelDialogResultEnum.CONFIRMED
          ? this.callApiToDelete(cheatingDetectionId, trainingInstanceId)
          : EMPTY,
      ),
    );
  }

  /**
   * Reruns detections of the specified cheating detection
   * @param cheatingDetectionId cheating detection id
   * @param trainingInstanceId id of training instance
   */
  rerun(cheatingDetectionId: number, trainingInstanceId: number): Observable<any> {
    return this.api.rerun(cheatingDetectionId, trainingInstanceId).pipe(
      tap(
        () => this.notificationService.emit('success', 'Cheating Detection was re-executed.'),
        (err) => this.errorHandler.emit(err, 'executing cheating detection rerun'),
      ),
    );
  }

  private displayDialogToDelete(cheatingDetectionId: number): Observable<SentinelDialogResultEnum> {
    const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
      data: new SentinelConfirmationDialogConfig(
        'Delete Cheating Detection',
        `Do you want to delete cheating detection "${cheatingDetectionId}"?`,
        'Cancel',
        'Delete',
      ),
    });
    return dialogRef.afterClosed();
  }

  private callApiToDelete(
    cheatingDetectionId: number,
    trainingInstanceId: number,
  ): Observable<PaginatedResource<CheatingDetection>> {
    return this.api.delete(cheatingDetectionId, trainingInstanceId).pipe(
      tap(
        () => this.notificationService.emit('success', 'Cheating Detection was deleted'),
        (err) => this.errorHandler.emit(err, 'Deleting cheating detection'),
      ),
      switchMap(() => this.getAll(trainingInstanceId, this.lastPagination)),
    );
  }

  /**
   * Creates and executed a new cheating detection
   * @param cheatingDetection the cheating detection
   */
  public createAndExecute(cheatingDetection: CheatingDetection): Observable<any> {
    return this.api.createAndExecute(cheatingDetection).pipe(
      tap(
        () => this.notificationService.emit('success', 'Cheating Detection was executed'),
        (err) => this.errorHandler.emit(err, 'Creating and executing cheating detection'),
      ),
    );
  }
  private onGetAllError() {
    this.hasErrorSubject$.next(true);
  }

  public download(cheatingDetectionId: number): Observable<any> {
    return this.api
      .archive(cheatingDetectionId)
      .pipe(tap({ error: (err) => this.errorHandler.emit(err, 'Downloading cheating detection') }));
  }
}
