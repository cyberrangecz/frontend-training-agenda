import { MatDialog } from '@angular/material/dialog';
import { SentinelConfirmationDialogComponent, SentinelConfirmationDialogConfig } from '@sentinel/components/dialogs';
import { BehaviorSubject, Observable } from 'rxjs';
import { RunningTrainingRunService } from '../../running/running-training-run.service';

export abstract class TrainingRunAccessLevelService {
  protected constructor(
    protected dialog: MatDialog,
    protected runningTrainingRunService: RunningTrainingRunService,
  ) {}

  protected isCorrectPasskeySubmittedSubject$: BehaviorSubject<boolean>;
  isCorrectPasskeySubmitted$: Observable<boolean>;

  protected isLoadingSubject$: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  abstract submitPasskey(passkey: string): Observable<any>;

  abstract getAccessFile(): Observable<boolean>;

  init(isLevelAnswered: boolean): void {
    this.isCorrectPasskeySubmittedSubject$ = new BehaviorSubject(isLevelAnswered);
    this.isCorrectPasskeySubmitted$ = this.isCorrectPasskeySubmittedSubject$.asObservable();
    this.isLoadingSubject$ = new BehaviorSubject(false);
    this.isLoading$ = this.isLoadingSubject$.asObservable();
  }

  protected onCorrectPasskeySubmitted(): Observable<any> {
    this.isCorrectPasskeySubmittedSubject$.next(true);
    return this.runningTrainingRunService.next();
  }

  protected onWrongPasskeySubmitted(): Observable<any> {
    const dialogMessage = 'You have submitted incorrect passkey.\n';
    const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
      data: new SentinelConfirmationDialogConfig('Incorrect Passkey', dialogMessage, '', 'OK'),
    });
    return dialogRef.afterClosed();
  }
}
