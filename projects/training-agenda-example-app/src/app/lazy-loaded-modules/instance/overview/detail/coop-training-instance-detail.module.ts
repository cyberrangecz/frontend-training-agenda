import { NgModule } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CoopTrainingDefaultNavigator, CoopTrainingNavigator, TrainingNavigator } from '@crczp/training-agenda';
import {
    CoopTrainingInstanceResolver,
    CoopTrainingInstanceTitleResolver,
    TrainingInstanceBreadcrumbResolver,
    TrainingInstanceResolver,
    TrainingInstanceTitleResolver,
} from '@crczp/training-agenda/resolvers';
import { CoopTrainingInstanceDetailComponentsModule } from '../../../../../../../training-agenda/instance-detail/src/components/coop-training-instance-detail-components.module';
import { CoopTrainingInstanceDetailRoutingModule } from './coop-training-instance-detail-routing.module';

@NgModule({
    imports: [
        CoopTrainingInstanceDetailComponentsModule.forRoot(environment.trainingAgendaConfig),
        CoopTrainingInstanceDetailRoutingModule,
    ],
    providers: [
        { provide: CoopTrainingNavigator, useClass: CoopTrainingDefaultNavigator },
        { provide: TrainingNavigator, useExisting: CoopTrainingNavigator },
        { provide: TrainingInstanceResolver, useClass: CoopTrainingInstanceResolver },
        { provide: TrainingInstanceTitleResolver, useClass: CoopTrainingInstanceTitleResolver },
        TrainingInstanceBreadcrumbResolver,
    ],
})
export class CoopTrainingInstanceDetailModule {}
