import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractLevelComponent } from '../../components/level/abstract-level.component';
import { RunningTrainingRunService } from 'kypo-training-agenda/internal';

@Injectable()
export class TrainingRunLevelsDeactivateGuard implements CanDeactivate<AbstractLevelComponent> {
  constructor(private activeTrainingRunLevelService: RunningTrainingRunService) {}

  canDeactivate(
    component: AbstractLevelComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.activeTrainingRunLevelService.clear();
    return true;
  }
}
