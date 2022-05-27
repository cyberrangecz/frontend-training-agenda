import { Level } from '@muni-kypo-crp/training-model';
import { AccessTrainingRunInfo } from '@muni-kypo-crp/training-model';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { ConsoleUrl } from '@muni-kypo-crp/topology-graph';

export abstract class RunningTrainingRunService {
  sandboxInstanceId: number;
  sandboxDefinitionId: number;
  localEnvironment: boolean;
  trainingRunId: number;

  protected activeLevelSubject$: BehaviorSubject<Level> = new BehaviorSubject<Level>(undefined);
  activeLevel$: Observable<Level> = this.activeLevelSubject$
    .asObservable()
    .pipe(skipWhile((level) => level === undefined || level === null));

  protected backtrackedLevelSubject$: BehaviorSubject<Level> = new BehaviorSubject<Level>(undefined);
  backtrackedLevel$: Observable<Level> = this.backtrackedLevelSubject$
    .asObservable()
    .pipe(skipWhile((level) => level === undefined || level === null));

  protected isCurrentLevelAnsweredSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isCurrentLevelAnswered$: Observable<boolean> = this.isCurrentLevelAnsweredSubject$.asObservable();

  abstract init(trainingRunInfo: AccessTrainingRunInfo): void;

  abstract getLevels(): Level[];

  abstract getActiveLevel(): Level;

  abstract getActiveLevelPosition(): number;

  abstract getStartTime(): Date;

  abstract getIsStepperDisplayed(): boolean;

  abstract next(): Observable<any>;

  abstract isLast(): boolean;

  abstract clear(): void;

  abstract loadConsoles(sandboxId: number): Observable<ConsoleUrl[]>;

  abstract moveToLevel(levelId: number): Observable<Level>;

  abstract getBackwardMode(): boolean;
}
