import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { SentinelConfirmationDialogComponent, SentinelConfirmationDialogConfig } from '@sentinel/components/dialogs';
import { RunningAdaptiveRunService } from '../running/running-adaptive-run.service';

export abstract class AdaptiveRunAccessPhaseService {
  protected constructor(
    protected dialog: MatDialog,
    protected runningAdaptiveRunService: RunningAdaptiveRunService,
  ) {}

  protected isCorrectPasskeySubmittedSubject$: BehaviorSubject<boolean>;
  isCorrectPasskeySubmitted$: Observable<boolean>;

  protected isLoadingSubject$: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  abstract submitPasskey(passkey: string): Observable<any>;

  abstract getAccessFile(): Observable<boolean>;

  init(isPhaseAnswered: boolean): void {
    this.isCorrectPasskeySubmittedSubject$ = new BehaviorSubject(isPhaseAnswered);
    this.isCorrectPasskeySubmitted$ = this.isCorrectPasskeySubmittedSubject$.asObservable();
    this.isLoadingSubject$ = new BehaviorSubject(false);
    this.isLoading$ = this.isLoadingSubject$.asObservable();
  }

  protected onCorrectPasskeySubmitted(): Observable<any> {
    this.isCorrectPasskeySubmittedSubject$.next(true);
    return this.runningAdaptiveRunService.next();
  }

  protected onWrongPasskeySubmitted(): Observable<any> {
    const dialogMessage = 'You have submitted incorrect passkey.\n';
    const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
      data: new SentinelConfirmationDialogConfig('Incorrect Passkey', dialogMessage, '', 'OK'),
    });
    return dialogRef.afterClosed();
  }
}
