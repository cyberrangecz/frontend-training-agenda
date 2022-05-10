import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractPhaseComponent } from '../../components/phase/abstract-phase.component';
import { RunningAdaptiveRunService } from '../adaptive-run/running/running-adaptive-run.service';

@Injectable()
export class AdaptiveRunPhasesDeactivateGuard implements CanDeactivate<AbstractPhaseComponent> {
  constructor(private activeAdaptiveRunLevelService: RunningAdaptiveRunService) {}

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.activeAdaptiveRunLevelService.clear();
    return true;
  }
}
