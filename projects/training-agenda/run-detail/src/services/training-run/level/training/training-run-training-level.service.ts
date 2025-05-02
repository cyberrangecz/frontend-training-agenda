import { Hint, TrainingLevel } from '@crczp/training-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HintButton } from '@crczp/training-agenda/internal';

export abstract class TrainingRunTrainingLevelService {
    protected hintsSubject$: BehaviorSubject<HintButton[]>;
    hints$: Observable<HintButton[]>;

    protected displayedHintsContentSubject$: BehaviorSubject<string>;
    displayedHintsContent$: Observable<string>;

    protected displayedSolutionContentSubject$: BehaviorSubject<string>;
    displayedSolutionContent$: Observable<string>;

    protected isSolutionRevealedSubject$: BehaviorSubject<boolean>;
    isSolutionRevealed$: Observable<boolean>;

    protected isCorrectAnswerSubmittedSubject$: BehaviorSubject<boolean>;
    isCorrectAnswerSubmitted$: Observable<boolean>;

    protected isLoadingSubject$: BehaviorSubject<boolean>;
    isLoading$: Observable<boolean>;

    abstract submitAnswer(answer: string): Observable<any>;

    abstract revealSolution(level: TrainingLevel): Observable<string>;

    abstract revealHint(hint: Hint): Observable<Hint>;

    abstract getAccessFile(): Observable<boolean>;

    abstract init(level: TrainingLevel, isLevelAnswered: boolean): void;
}
