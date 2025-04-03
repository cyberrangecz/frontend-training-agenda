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

/**
 * Main module of training instance edit components and providers
 */
@NgModule({
    imports: [CommonTrainingInstanceEditOverviewComponentsModule],
    declarations: [CoopTrainingInstanceEditOverviewComponent],
    exports: [CoopTrainingInstanceEditOverviewComponent],
    //providers: [TrainingInstanceCanDeactivate],
})
export class CoopTrainingInstanceEditOverviewComponentsModule {
    constructor(private router: Router) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                console.log('Navigation Started:', event.url);
            } else if (event instanceof NavigationEnd) {
                console.log('Navigation Ended:', event.url);
            } else if (event instanceof NavigationCancel) {
                console.warn('Navigation Cancelled:', event.url);
            } else if (event instanceof NavigationError) {
                console.error('Navigation Error:', event.error);
            }
        });
    }

    static forRoot(
        config: TrainingAgendaConfig,
    ): ModuleWithProviders<CoopTrainingInstanceEditOverviewComponentsModule> {
        console.log('lodaing forroot');
        return {
            ngModule: CoopTrainingInstanceEditOverviewComponentsModule,
            providers: [
                { provide: TrainingNavigator, useClass: CoopTrainingDefaultNavigator },
                CoopTrainingInstanceResolver,
                { provide: TrainingAgendaConfig, useValue: config },
            ],
        };
    }
}
