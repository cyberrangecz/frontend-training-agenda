import { ModuleWithProviders, NgModule } from '@angular/core';
import {
    CoopTrainingDefaultNavigator,
    CoopTrainingNavigator,
    TrainingAgendaConfig,
    TrainingNavigator,
} from '@crczp/training-agenda';
import { CommonTrainingInstanceEditOverviewComponentsModule } from './common-instance-edit-overview-components.module';
import { CoopTrainingInstanceEditOverviewComponent } from './coop-training-instance-edit-overview/coop-training-instance-edit-overview.component';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { CoopTrainingInstanceResolver, TrainingInstanceResolver } from '@crczp/training-agenda/resolvers';
import { TrainingTypeEnum } from '@crczp/training-model';
import { TrainingInstanceCanDeactivate } from '../services/can-deactivate/training-instance-can-deactivate.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatFormField } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { TrainingInstanceEditService } from '../services/state/edit/training-instance-edit.service';
import { TrainingInstanceEditConcreteService } from '../services/state/edit/common-training-instance-concrete-edit.service';
import { SentinelUserAssignService } from '@sentinel/components/user-assign';
import { OrganizersAssignService } from '../services/state/organizers-assign/organizers-assign.service';
import { MatInput } from '@angular/material/input';

/**
 * Main module of training instance edit components and providers
 */
@NgModule({
    imports: [
        CommonTrainingInstanceEditOverviewComponentsModule,
        MatProgressSpinner,
        MatFormField,
        ReactiveFormsModule,
        MatInput,
    ],
    declarations: [CoopTrainingInstanceEditOverviewComponent],
    exports: [CoopTrainingInstanceEditOverviewComponent],
    providers: [
        { provide: TrainingInstanceEditService, useClass: TrainingInstanceEditConcreteService },
        { provide: SentinelUserAssignService, useClass: OrganizersAssignService },
    ],
})
export class CoopTrainingInstanceEditOverviewComponentsModule {
    static forRoot(
        config: TrainingAgendaConfig,
    ): ModuleWithProviders<CoopTrainingInstanceEditOverviewComponentsModule> {
        return {
            ngModule: CoopTrainingInstanceEditOverviewComponentsModule,
            providers: [
                { provide: TrainingTypeEnum, useValue: TrainingTypeEnum.COOP },
                { provide: TrainingNavigator, useClass: CoopTrainingDefaultNavigator },
                { provide: TrainingAgendaConfig, useValue: config },
            ],
        };
    }
}
