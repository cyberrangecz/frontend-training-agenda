import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractLevelComponent } from '../../components/level/abstract-level.component';
import { RunningTrainingRunService } from '@muni-kypo-crp/training-agenda/internal';

@Injectable()
export class TrainingRunLevelsDeactivateGuard implements CanDeactivate<AbstractLevelComponent> {
  constructor(private activeTrainingRunLevelService: RunningTrainingRunService) {}

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.activeTrainingRunLevelService.clear();
    return true;
  }
}
