import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TrainingInstance } from '@crczp/training-model';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, take } from 'rxjs/operators';
import { TRAINING_INSTANCE_NEW_PATH, TRAINING_INSTANCE_SELECTOR } from '@crczp/training-agenda';
import { TrainingInstanceResolver } from './training-instance-resolver.service';

export abstract class TrainingInstanceTitleResolver {
    protected constructor(
        private trainingInstanceResolver: TrainingInstanceResolver,
        private instanceBasePath: string,
        private createNewPlaceholder: string,
    ) {}

    /**
     * Retrieves a specific resource title based on id provided in url
     * @param route route snapshot
     * @param state router state snapshot
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
        if (state.url.endsWith(`${this.instanceBasePath}/${TRAINING_INSTANCE_NEW_PATH}`)) {
            return this.createNewPlaceholder;
        } else if (route.paramMap.has(TRAINING_INSTANCE_SELECTOR)) {
            const resolved = this.trainingInstanceResolver.resolve(route, state) as Observable<TrainingInstance>;
            return resolved.pipe(
                take(1),
                mergeMap((ti) => (ti ? of(`Edit ${ti.title}`) : '')),
                catchError(() => ''),
            );
        }
        return '';
    }
}
