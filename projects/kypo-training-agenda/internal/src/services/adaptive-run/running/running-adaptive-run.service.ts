import { BehaviorSubject, Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { AccessTrainingRunInfo, Phase, QuestionAnswer } from '@muni-kypo-crp/training-model';
import { ConsoleUrl } from '@muni-kypo-crp/topology-graph';

export abstract class RunningAdaptiveRunService {
  sandboxInstanceId: number;
  sandboxDefinitionId: number;
  localEnvironment: boolean;
  trainingRunId: number;

  protected activePhaseSubject$: BehaviorSubject<Phase> = new BehaviorSubject<Phase>(undefined);
  activePhase$: Observable<Phase> = this.activePhaseSubject$
    .asObservable()
    .pipe(skipWhile((phase) => phase === undefined || phase === null));

  abstract init(adaptiveRunInfo: AccessTrainingRunInfo): void;
  abstract setActivePhaseIndex(index: number): void;
  abstract getPhases(): Phase[];
  abstract getActivePhase(): Phase;
  abstract getActivePhasePosition(): number;
  abstract getStartTime(): Date;
  abstract getIsStepperDisplayed(): boolean;
  abstract getIsPreview(): boolean;
  abstract next(): Observable<any>;
  abstract isLast(): boolean;
  abstract clear(): void;
  abstract submitQuestionnaire(answers: QuestionAnswer[]): Observable<any>;
  abstract loadConsoles(sandboxId: number): Observable<ConsoleUrl[]>;
}
