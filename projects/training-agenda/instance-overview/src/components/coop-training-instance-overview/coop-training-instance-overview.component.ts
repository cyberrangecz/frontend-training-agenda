import { Component, DestroyRef, inject } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { TrainingInstanceOverviewControls } from '../../model/adapters/training-instance-overview-controls';
import { CoopTrainingInstanceTableFactory } from '../../model/adapters/coop-training-instance-table-factory';
import { CoopTrainingInstanceOverviewService } from '../../services/state/coop-training-instance-overview-concrete.service';
import { CoopTrainingNavigator } from '@crczp/training-agenda';
import { Observable, of, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TrainingInstance } from '@crczp/training-model';
import { LinearTrainingInstanceTableFactory } from '../../model/adapters/linear-training-instance-table-factory';

@Component({
    selector: 'crczp-coop-training-instance-overview',
    templateUrl: './coop-training-instance-overview.component.html',
    styleUrl: './coop-training-instance-overview.component.css',
})
export class CoopTrainingInstanceOverviewComponent {
    constructor(
        private service: CoopTrainingInstanceOverviewService,
        private navigator: CoopTrainingNavigator,
    ) {}

    private destroyRef = inject(DestroyRef);

    table$ = this.service.resource$.pipe(
        map((instances) => new CoopTrainingInstanceTableFactory(instances, this.service, this.navigator).createTable()),
    );

    buildControls = () => TrainingInstanceOverviewControls.create(this.service);

    private playersWaiting$: Observable<{
        [key: TrainingInstance['id']]: number;
    }> = timer(0, 1000).pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => this.service.playersWaiting()),
    );

    getPlayersWaiting$(instanceId: number): Observable<number> {
        return of(0); //this.playersWaiting$.pipe(map((waitingDictionary) => waitingDictionary[instanceId]));
    }
}
