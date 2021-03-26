import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { RunningAdaptiveRunService } from '@muni-kypo-crp/training-agenda/internal';
import { AbstractPhaseComponent } from '../../components/phase/abstract-phase.component';

@Injectable()
export class AdaptiveRunPhasesDeactivateGuard implements CanDeactivate<AbstractPhaseComponent> {
  constructor(private activeAdaptiveRunLevelService: RunningAdaptiveRunService) {}

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.activeAdaptiveRunLevelService.clear();
    return true;
  }
}
