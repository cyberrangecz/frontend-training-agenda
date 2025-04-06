import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { TrainingInstanceOverviewService } from '../../services/state/training-instance-overview.service';
import { TrainingNavigator } from '@crczp/training-agenda';
import { LinearTrainingInstanceTableFactory } from '../../model/adapters/linear-training-instance-table-factory';
import { TrainingInstanceOverviewControls } from '../../model/adapters/training-instance-overview-controls';

@Component({
    selector: 'crczp-linear-training-instance-overview',
    templateUrl: './linear-training-instance-overview.component.html',
    styleUrl: './linear-training-instance-overview.component.css',
})
export class LinearTrainingInstanceOverviewComponent {
    constructor(
        private service: TrainingInstanceOverviewService,
        private navigator: TrainingNavigator,
    ) {}

    table$ = this.service.resource$.pipe(
        map((instances) =>
            new LinearTrainingInstanceTableFactory(instances, this.service, this.navigator).createTable(),
        ),
    );

    buildControls = () => TrainingInstanceOverviewControls.create(this.service);
}
