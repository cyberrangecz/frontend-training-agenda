import { ModuleWithProviders, NgModule } from '@angular/core';
import {
    CoopTrainingDefaultNavigator,
    CoopTrainingNavigator,
    TrainingAgendaConfig,
    TrainingNavigator,
} from '@crczp/training-agenda';
import { CommonTrainingInstanceOverviewComponentsModule } from './common-training-instance-overview-components.module';
import {
    CoopTrainingInstanceOverviewConcreteService,
    CoopTrainingInstanceOverviewService,
} from '../services/state/coop-training-instance-overview-concrete.service';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { AsyncPipe } from '@angular/common';
import {
    CoopTrainingInstanceResolver,
    CoopTrainingInstanceTitleResolver,
    TrainingInstanceResolver,
    TrainingInstanceTitleResolver,
} from '@crczp/training-agenda/resolvers';
import { CoopTrainingInstanceOverviewComponent } from './coop-training-instance-overview/coop-training-instance-overview.component';
import { TrainingInstanceOverviewService } from '../services/state/training-instance-overview.service';

/**
 * Main module of training instance agenda. Contains components and providers for displaying table of training instance
 * and CRUD operations on them. It contains routing to more feature modules (detail atc.)
 */
@NgModule({
    imports: [CommonTrainingInstanceOverviewComponentsModule, MatIcon, MatTooltip, AsyncPipe],
    declarations: [CoopTrainingInstanceOverviewComponent],
    providers: [
        { provide: TrainingInstanceResolver, useValue: CoopTrainingInstanceResolver },
        { provide: TrainingInstanceTitleResolver, useValue: CoopTrainingInstanceTitleResolver },
        { provide: TrainingNavigator, useClass: CoopTrainingDefaultNavigator },
        { provide: CoopTrainingNavigator, useClass: CoopTrainingDefaultNavigator },
        { provide: CoopTrainingInstanceOverviewService, useClass: CoopTrainingInstanceOverviewConcreteService },
        { provide: TrainingInstanceOverviewService, useClass: CoopTrainingInstanceOverviewConcreteService },
    ],
    exports: [CoopTrainingInstanceOverviewComponent],
})
export class CoopTrainingInstanceOverviewComponentsModule {
    static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<CoopTrainingInstanceOverviewComponentsModule> {
        return {
            ngModule: CoopTrainingInstanceOverviewComponentsModule,
            providers: [{ provide: TrainingAgendaConfig, useValue: config }],
        };
    }
}
