import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AbstractPhaseComponent } from '../../components/phase/abstract-phase.component';
import { RunningAdaptiveRunService } from '../adaptive-run/running/running-adaptive-run.service';

@Injectable()
export class AdaptiveRunPhasesDeactivateGuard {
  constructor(private activeAdaptiveRunLevelService: RunningAdaptiveRunService) {}

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.activeAdaptiveRunLevelService.clear();
    return true;
  }
}
