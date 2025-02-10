import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { TrainingNavigator } from '@cyberrangecz-platform/training-agenda';
import { MitreTechniquesOverviewService } from './mitre-techniques.service';
import { Router } from '@angular/router';

@Injectable()
export class MitreTechniquesOverviewConcreteService extends MitreTechniquesOverviewService {
  constructor(
    private router: Router,
    private navigator: TrainingNavigator,
  ) {
    super();
  }

  showMitreTechniques(): Observable<any> {
    return from(this.router.navigate([this.navigator.toTrainingRunMitreTechniques()]));
  }
}
