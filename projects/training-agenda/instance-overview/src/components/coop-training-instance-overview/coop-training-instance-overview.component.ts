import { Component, DestroyRef, inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { TrainingInstanceOverviewControls } from '../../model/adapters/training-instance-overview-controls';
import { CoopTrainingInstanceTableFactory } from '../../model/adapters/coop-training-instance-table-factory';
import { CoopTrainingInstanceOverviewService } from '../../services/state/coop-training-instance-overview-concrete.service';
import { CoopTrainingNavigator } from '@crczp/training-agenda';
import { TrainingInstance } from '@crczp/training-model';

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

    getPlayersWaiting(id: number): number {
        return this.service.playersWaiting(id);
    }

    castToInstance(element: unknown): TrainingInstance {
        return element as TrainingInstance;
    }
}
