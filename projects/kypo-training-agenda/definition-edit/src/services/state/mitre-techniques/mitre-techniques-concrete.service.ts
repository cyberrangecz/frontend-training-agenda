import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MitreTechniquesApi } from '@muni-kypo-crp/training-api';
import { MitreTechnique } from '@muni-kypo-crp/training-model';
import { TrainingErrorHandler } from '@muni-kypo-crp/training-agenda';
import { MitreTechniquesService } from './mitre-techniques.service';

@Injectable()
export class MitreTechniquesConcreteService extends MitreTechniquesService {
  constructor(
    private api: MitreTechniquesApi,
    private errorHandler: TrainingErrorHandler,
  ) {
    super();
  }

  getAll(): Observable<MitreTechnique[]> {
    return this.api.getMitreTechniquesList().pipe(
      tap(
        (res) => this.mitreTechniquesSubject$.next(res),
        (err) => this.errorHandler.emit(err, 'Loading MITRE techniques list'),
      ),
    );
  }
}
