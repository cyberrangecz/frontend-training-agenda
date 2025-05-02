import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
    SentinelConfirmationDialogComponent,
    SentinelConfirmationDialogConfig,
    SentinelDialogResultEnum,
} from '@sentinel/components/dialogs';
import { TrainingRunApi } from '@crczp/training-api';
import { Hint, LevelAnswerCheck, PhaseAnswerCheck, TrainingLevel } from '@crczp/training-model';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { TrainingErrorHandler } from '@crczp/training-agenda';
import { TrainingRunTrainingLevelService } from './training-run-training-level.service';
import { RunningTrainingRunService } from '../../running/running-training-run.service';
import { SandboxInstanceApi } from '@crczp/sandbox-api';
import {
    SentinelNotification,
    SentinelNotificationResult,
    SentinelNotificationService,
    SentinelNotificationTypeEnum,
} from '@sentinel/layout/notification';
import { HintButton } from '@crczp/training-agenda/internal';

@Injectable()
/**
 * Handles events and actions specific for training level in training run
 */
export class TrainingRunTrainingLevelConcreteService extends TrainingRunTrainingLevelService {
    constructor(
        private api: TrainingRunApi,
        private sandboxApi: SandboxInstanceApi,
        private errorHandler: TrainingErrorHandler,
        private notificationService: SentinelNotificationService,
        private dialog: MatDialog,
        protected runningTrainingRunService: RunningTrainingRunService,
    ) {
        super();
    }

    init(level: TrainingLevel, isLevelAnswered: boolean): void {
        this.initObservables(isLevelAnswered);
        this.initHints(level.hints);
        this.initSolutionState(level);
    }

    /**
     * Retrieves file for ssh access for trainee
     */
    getAccessFile(): Observable<any> {
        return this.sandboxApi.getUserSshAccess(this.runningTrainingRunService.sandboxInstanceId).pipe(
            tap(
                (_) => _,
                (err) => {
                    this.errorHandler.emit(err, 'Access files for trainee');
                },
            ),
        );
    }

    /**
     * Evaluates if answer entered by trainee is correct
     * @param answer answer entered by trainee
     */
    submitAnswer(answer: string): Observable<any> {
        if (!answer) {
            return this.displayEmptyAnswerDialog();
        }
        this.isLoadingSubject$.next(true);
        return this.api.isCorrectAnswer(this.runningTrainingRunService.trainingRunId, answer).pipe(
            switchMap((answerCheckResult) =>
                answerCheckResult.isCorrect
                    ? this.onCorrectAnswerSubmitted()
                    : this.onWrongAnswerSubmitted(answerCheckResult),
            ),
            tap(
                () => this.isLoadingSubject$.next(false),
                (err) => {
                    this.isLoadingSubject$.next(false);
                    this.errorHandler.emit(err, 'Submitting answer');
                },
            ),
        );
    }

    /**
     * Displays solution of current training level
     */
    revealSolution(level: TrainingLevel): Observable<string> {
        return this.displayRevealSolutionDialog(level.solutionPenalized).pipe(
            switchMap((result) =>
                result === SentinelDialogResultEnum.CONFIRMED
                    ? this.callApiToRevealSolution(this.runningTrainingRunService.trainingRunId)
                    : EMPTY,
            ),
        );
    }

    /**
     * Displays selected hint
     * @param hint  selected hint
     */
    revealHint(hint: Hint): Observable<Hint> {
        return this.displayTakeHintDialog(hint).pipe(
            switchMap((result) =>
                result === SentinelDialogResultEnum.CONFIRMED
                    ? this.callApiToTakeHint(this.runningTrainingRunService.trainingRunId, hint)
                    : EMPTY,
            ),
        );
    }

    protected initObservables(isLevelAnswered: boolean): void {
        this.hintsSubject$ = new BehaviorSubject([]);
        this.hints$ = this.hintsSubject$.asObservable();
        this.displayedHintsContentSubject$ = new BehaviorSubject(undefined);
        this.displayedHintsContent$ = this.displayedHintsContentSubject$.asObservable();
        this.displayedSolutionContentSubject$ = new BehaviorSubject(undefined);
        this.displayedSolutionContent$ = this.displayedSolutionContentSubject$.asObservable();
        this.isSolutionRevealedSubject$ = new BehaviorSubject(false);
        this.isSolutionRevealed$ = this.isSolutionRevealedSubject$.asObservable();
        this.isCorrectAnswerSubmittedSubject$ = new BehaviorSubject(isLevelAnswered);
        this.isCorrectAnswerSubmitted$ = this.isCorrectAnswerSubmittedSubject$.asObservable();
        this.isLoadingSubject$ = new BehaviorSubject(false);
        this.isLoading$ = this.isLoadingSubject$.asObservable();
    }

    protected initSolutionState(level: TrainingLevel): void {
        if (level.hasSolution()) {
            this.isSolutionRevealedSubject$.next(true);
            this.onSolutionRevealed(level.solution);
        }
    }

    protected initHints(hints: Hint[]): void {
        const hintButtons: HintButton[] = [];
        hints.forEach((hint, index) => {
            hintButtons.push(new HintButton(hint.isRevealed(), hint));
            if (hint.isRevealed()) {
                this.addHintContent(hint, index + 1);
            }
        });
        this.hintsSubject$.next(hintButtons);
    }

    protected onHintRevealed(hint: Hint): void {
        const hintButtons = this.hintsSubject$.getValue();
        const hintToRevealIndex = hintButtons.findIndex((hintButton) => hintButton.hint.id === hint.id);
        if (hintToRevealIndex !== -1) {
            const hintToReveal = hintButtons[hintToRevealIndex];
            hintToReveal.disable();
            hintToReveal.hint = hint;
            hintButtons[hintToRevealIndex] = hintToReveal;
            this.hintsSubject$.next(hintButtons);
            this.addHintContent(hint, hintToRevealIndex + 1);
        }
    }

    protected addHintContent(hint: Hint, order: number): void {
        let content = this.displayedHintsContentSubject$.getValue();
        const hintContent = '\n\n## Hint ' + order + ': ' + hint.title + '\n' + hint.content;
        if (content) {
            content += hintContent;
        } else {
            content = hintContent;
        }
        this.displayedHintsContentSubject$.next(content);
        this.runningTrainingRunService.hintRevealed(hint);
    }

    protected onSolutionRevealed(solution: string): void {
        this.displayedSolutionContentSubject$.next(solution);
        this.isSolutionRevealedSubject$.next(true);
        this.runningTrainingRunService.solutionRevealed(solution);
    }

    protected shouldSolutionBeRevealed(answerCheck: PhaseAnswerCheck): boolean {
        return !this.isSolutionRevealedSubject$.getValue() && !answerCheck.hasRemainingAttempts();
    }

    protected onCorrectAnswerSubmitted(): Observable<any> {
        this.isCorrectAnswerSubmittedSubject$.next(true);
        return this.runningTrainingRunService.next();
    }

    protected onWrongAnswerSubmitted(answerCheck: PhaseAnswerCheck): Observable<any> {
        if (this.shouldSolutionBeRevealed(answerCheck)) {
            this.onSolutionRevealed(answerCheck.solution);
        }
        return this.displayWrongAnswerDialog(answerCheck);
    }

    protected displayEmptyAnswerDialog(): Observable<any> {
        const notification: SentinelNotification = {
            type: SentinelNotificationTypeEnum.Error,
            title: 'Incorrect passkey',
            additionalInfo: ['Answer cannot be empty.'],
        };
        return this.notificationService
            .emit(notification)
            .pipe(map((result) => result === SentinelNotificationResult.CONFIRMED));
    }

    protected displayWrongAnswerDialog(answerCheck: LevelAnswerCheck): Observable<any> {
        const notification: SentinelNotification = {
            type: SentinelNotificationTypeEnum.Error,
            title: 'Incorrect passkey',
            additionalInfo: [
                'You have submitted an incorrect answer.',
                this.isSolutionRevealedSubject$.getValue() || answerCheck.remainingAttempts <= 0
                    ? 'Please insert the answer according to revealed solution.'
                    : `You have ${answerCheck.remainingAttempts} remaining attempts.`,
            ],
        };
        return this.notificationService
            .emit(notification)
            .pipe(map((result) => result === SentinelNotificationResult.CONFIRMED));
    }

    protected displayTakeHintDialog(hint: Hint): Observable<SentinelDialogResultEnum> {
        const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
            data: new SentinelConfirmationDialogConfig(
                'Reveal Hint',
                `Do you want to reveal hint "${hint.title}"?
 It will cost you ${hint.penalty} points.`,
                'Cancel',
                'Reveal',
            ),
        });
        return dialogRef.afterClosed();
    }

    protected displayRevealSolutionDialog(solutionPenalized: boolean): Observable<SentinelDialogResultEnum> {
        let dialogMessage = 'Do you want to reveal solution of this level?';
        dialogMessage += solutionPenalized ? '\n All your points will be subtracted.' : '';

        const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
            data: new SentinelConfirmationDialogConfig('Reveal Solution', dialogMessage, 'Cancel', 'Reveal'),
        });
        return dialogRef.afterClosed();
    }

    protected callApiToRevealSolution(trainingRunId: number): Observable<string> {
        this.isLoadingSubject$.next(true);
        return this.api.takeSolution(trainingRunId).pipe(
            tap(
                (solution) => {
                    this.isLoadingSubject$.next(false);
                    this.onSolutionRevealed(solution);
                },
                (err) => {
                    this.isLoadingSubject$.next(false);
                    this.errorHandler.emit(err, 'Revealing solution');
                },
            ),
        );
    }

    protected callApiToTakeHint(trainingRunId: number, hint: Hint): Observable<Hint> {
        this.isLoadingSubject$.next(true);
        return this.api.takeHint(trainingRunId, hint.id).pipe(
            tap(
                (takenHint) => {
                    this.isLoadingSubject$.next(false);
                    this.onHintRevealed(takenHint);
                },
                (err) => {
                    this.isLoadingSubject$.next(false);
                    this.errorHandler.emit(err, `Taking hint "${hint.title}"`);
                },
            ),
        );
    }
}
