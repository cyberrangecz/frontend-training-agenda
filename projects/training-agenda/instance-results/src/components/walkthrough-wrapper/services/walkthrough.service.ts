import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingDefinition } from '@cyberrangecz-platform/training-model';
import { TrainingDefinitionApi } from '@cyberrangecz-platform/training-api';

@Injectable()
export class WalkthroughService {
  constructor(private api: TrainingDefinitionApi) {}

  /**
   * Gets training definition by @definitionId. Updates related observables or handles an error
   * @param definitionId ID of requested training definition
   */
  get(definitionId: number): Observable<TrainingDefinition> {
    return this.api.get(definitionId, true);
  }
}
