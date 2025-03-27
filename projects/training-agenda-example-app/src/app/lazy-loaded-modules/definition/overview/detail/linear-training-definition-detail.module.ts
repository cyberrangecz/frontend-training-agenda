import { NgModule } from '@angular/core';
import { LinearDefinitionDetailComponentsModule } from '@crczp/training-agenda/definition-detail';
import { environment } from '../../../../../environments/environment';
import { LinearDefinitionDetailRoutingModule } from './linear-definition-detail-routing.module';
import {
    CommonTrainingDefinitionResolver,
    CommonTrainingDefinitionTitleResolver,
    LinearTrainingDefinitionResolver,
    LinearTrainingDefinitionTitleResolver,
} from '@crczp/training-agenda/resolvers';

@NgModule({
    imports: [
        LinearDefinitionDetailComponentsModule.forRoot(environment.trainingAgendaConfig),
        LinearDefinitionDetailRoutingModule,
    ],
    providers: [
        { provide: CommonTrainingDefinitionResolver, useClass: LinearTrainingDefinitionResolver },
        { provide: CommonTrainingDefinitionTitleResolver, useClass: LinearTrainingDefinitionTitleResolver },
    ],
})
export class LinearTrainingDefinitionDetailModule {}
