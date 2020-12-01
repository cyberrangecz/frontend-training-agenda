import { Level } from '@kypo/training-model';
import { AccessTrainingRunInfo } from '@kypo/training-model';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';

export abstract class RunningTrainingRunService {
  sandboxInstanceId: number;
  trainingRunId: number;

  protected activeLevelSubject$: BehaviorSubject<Level> = new BehaviorSubject<Level>(undefined);
  activeLevel$: Observable<Level> = this.activeLevelSubject$
    .asObservable()
    .pipe(skipWhile((level) => level === undefined || level === null));

  abstract init(trainingRunInfo: AccessTrainingRunInfo);

  abstract getLevels(): Level[];

  abstract getActiveLevel(): Level;

  abstract getActiveLevelPosition(): number;

  abstract getStartTime(): Date;

  abstract getIsStepperDisplayed(): boolean;

  abstract next(): Observable<any>;

  abstract isLast(): boolean;

  abstract clear();
}
