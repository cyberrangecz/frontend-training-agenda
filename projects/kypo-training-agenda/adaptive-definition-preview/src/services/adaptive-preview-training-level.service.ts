import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SentinelDialogResultEnum } from '@sentinel/components/dialogs';
import { TrainingPhase } from '@muni-kypo-crp/training-model';
import { EMPTY, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AdaptiveRunTrainingPhaseService, RunningAdaptiveRunService } from '@muni-kypo-crp/training-agenda/internal';
import { saveAs } from 'file-saver';

@Injectable()
/**
 * Mocks behavior of training run training level service connected to backend for designers preview purposes
 */
export class AdaptivePreviewTrainingLevelService extends AdaptiveRunTrainingPhaseService {
  constructor(protected dialog: MatDialog, protected runningAdaptiveRunService: RunningAdaptiveRunService) {
    super(dialog, runningAdaptiveRunService);
  }

  private _currentLevel: TrainingPhase;
  private _remainingAttempts = -1;

  init(level: TrainingPhase): void {
    super.init(level);
    this._currentLevel = level;
    this._remainingAttempts = this._currentLevel.allowedWrongAnswers;
  }

  getAccessFile(): Observable<any> {
    const blob = new Blob(new Array<Blob>(), { type: 'application/zip' });
    saveAs(blob, 'user-ssh-access.zip');
    return of(true);
  }

  revealSolution(): Observable<string> {
    return this.displayRevealSolutionDialog().pipe(
      switchMap((result) => (result === SentinelDialogResultEnum.CONFIRMED ? EMPTY : EMPTY))
    );
  }

  submitAnswer(answer: string): Observable<any> {
    return of(answer);
  }
}
