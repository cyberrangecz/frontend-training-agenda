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

  abstract init(trainingRunInfo: AccessTrainingRunInfo): void;

  abstract setActiveLevelIndex(index: number): void;

  abstract getLevels(): Level[];

  abstract getActiveLevel(): Level;

  abstract getActiveLevelPosition(): number;

  abstract getStartTime(): Date;

  abstract getIsStepperDisplayed(): boolean;

  abstract getIsPreview(): boolean;

  abstract next(): Observable<any>;

  abstract isLast(): boolean;

  abstract clear(): void;

  abstract loadConsoles(sandboxId: number): Observable<ConsoleUrl[]>;
}
