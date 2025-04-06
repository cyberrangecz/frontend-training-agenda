import { ModuleWithProviders, NgModule } from '@angular/core';
import { LinearTrainingDefaultNavigator, TrainingAgendaConfig, TrainingNavigator } from '@crczp/training-agenda';
import { CommonTrainingInstanceEditOverviewComponentsModule } from './common-instance-edit-overview-components.module';
import { LinearTrainingInstanceEditOverviewComponent } from './linear-training-instance-edit-overview/linear-training-instance-edit-overview.component';
import { TrainingTypeEnum } from '@crczp/training-model';
import { TrainingInstanceEditService } from '../services/state/edit/training-instance-edit.service';
import { TrainingInstanceEditConcreteService } from '../services/state/edit/common-training-instance-concrete-edit.service';
import { SentinelUserAssignService } from '@sentinel/components/user-assign';
import { OrganizersAssignService } from '../services/state/organizers-assign/organizers-assign.service';

/**
 * Main module of training instance edit components and providers
 */
@NgModule({
    imports: [CommonTrainingInstanceEditOverviewComponentsModule],
    declarations: [LinearTrainingInstanceEditOverviewComponent],
    exports: [LinearTrainingInstanceEditOverviewComponent],
    providers: [
        { provide: TrainingInstanceEditService, useClass: TrainingInstanceEditConcreteService },
        { provide: SentinelUserAssignService, useClass: OrganizersAssignService },
    ],
})
export class LinearTrainingInstanceEditOverviewComponentsModule {
    static forRoot(
        config: TrainingAgendaConfig,
    ): ModuleWithProviders<LinearTrainingInstanceEditOverviewComponentsModule> {
        return {
            ngModule: LinearTrainingInstanceEditOverviewComponentsModule,
            providers: [
                { provide: TrainingTypeEnum, useValue: TrainingTypeEnum.LINEAR },
                { provide: TrainingNavigator, useClass: LinearTrainingDefaultNavigator },
                { provide: TrainingAgendaConfig, useValue: config },
            ],
        };
    }
}
