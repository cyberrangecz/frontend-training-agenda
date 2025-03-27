import { NgModule } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {
    CommonTrainingDefinitionResolver,
    CommonTrainingDefinitionTitleResolver,
    CoopTrainingDefinitionResolver,
    CoopTrainingDefinitionTitleResolver,
} from '@crczp/training-agenda/resolvers';
import { CoopDefinitionDetailRoutingModule } from './coop-definition-detail-routing.module';
import { CoopDefinitionDetailComponentsModule } from '@crczp/training-agenda/definition-detail';

@NgModule({
    imports: [
        CoopDefinitionDetailComponentsModule.forRoot(environment.trainingAgendaConfig),
        CoopDefinitionDetailRoutingModule,
    ],
    providers: [
        { provide: CommonTrainingDefinitionResolver, useClass: CoopTrainingDefinitionResolver },
        { provide: CommonTrainingDefinitionTitleResolver, useClass: CoopTrainingDefinitionTitleResolver },
    ],
})
export class CoopTrainingDefinitionDetailModule {}
