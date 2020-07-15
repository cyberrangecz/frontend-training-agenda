import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingInstance } from 'kypo-training-model';
import { from, Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrainingNavigator } from 'kypo-training-agenda';
import { TrainingInstanceSummaryService } from './training-instance-summary.service';

@Injectable()
export class TrainingInstanceSummaryConcreteService extends TrainingInstanceSummaryService {
  constructor(private router: Router, private navigator: TrainingNavigator) {
    super();
  }

  init(ti: TrainingInstance) {
    this.trainingInstance = ti;
    this.hasStarted$ = timer(0, 60000).pipe(map((_) => this.trainingInstance.hasStarted()));
  }

  showProgress(): Observable<boolean> {
    return from(this.router.navigate([this.navigator.toTrainingInstanceProgress(this.trainingInstance.id)]));
  }

  showResults(): Observable<any> {
    return from(this.router.navigate([this.navigator.toTrainingInstanceResults(this.trainingInstance.id)]));
  }
}
