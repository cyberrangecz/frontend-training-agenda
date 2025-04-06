import { ModuleWithProviders, NgModule } from '@angular/core';
import { LinearTrainingDefaultNavigator, TrainingAgendaConfig, TrainingNavigator } from '@crczp/training-agenda';
import { LinearTrainingInstanceOverviewConcreteService } from '../services/state/linear-training-instance-overview-concrete.service';
import { TrainingInstanceOverviewService } from '../services/state/training-instance-overview.service';
import { LinearTrainingInstanceOverviewComponent } from './linear-training-instance-overview/linear-training-instance-overview.component';
import { CommonTrainingInstanceOverviewComponentsModule } from './common-training-instance-overview-components.module';

/**
 * Main module of training instance agenda. Contains components and providers for displaying table of training instance
 * and CRUD operations on them. It contains routing to more feature modules (detail atc.)
 */
@NgModule({
    imports: [CommonTrainingInstanceOverviewComponentsModule],
    declarations: [LinearTrainingInstanceOverviewComponent],
    providers: [
        { provide: TrainingNavigator, useClass: LinearTrainingDefaultNavigator },
        { provide: TrainingInstanceOverviewService, useClass: LinearTrainingInstanceOverviewConcreteService },
    ],
    exports: [LinearTrainingInstanceOverviewComponent],
})
export class LinearTrainingInstanceOverviewComponentsModule {
    static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<LinearTrainingInstanceOverviewComponentsModule> {
        return {
            ngModule: LinearTrainingInstanceOverviewComponentsModule,
            providers: [{ provide: TrainingAgendaConfig, useValue: config }],
        };
    }
}
