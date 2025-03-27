import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SentinelPipesModule } from '@sentinel/common/pipes';
import { SentinelControlsComponent } from '@sentinel/components/controls';
import { SentinelUserAssignComponent } from '@sentinel/components/user-assign';
import { TrainingDefinitionCanDeactivate } from '../services/can-deactivate/training-definition-can-deactivate.service';
import { TrainingDefinitionEditComponent } from './definition/training-definition-edit.component';
import { LevelOverviewComponentsModule } from './levels/level-overview-components.module';
import { TrainingDefinitionEditOverviewMaterialModule } from './training-definition-edit-overview-material.module';
import { TrainingDefinitionEditOverviewComponent } from './training-definition-edit-overview.component';
import { SentinelFreeFormComponent } from '@sentinel/components/free-form';
import { TrainingTypeEnum } from '@crczp/training-model';

/**
 * Module containing components and providers of training definition detail/edt/new actions.
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SentinelUserAssignComponent,
        TrainingDefinitionEditOverviewMaterialModule,
        LevelOverviewComponentsModule,
        SentinelPipesModule,
        ReactiveFormsModule,
        SentinelControlsComponent,
        SentinelFreeFormComponent,
    ],
    declarations: [TrainingDefinitionEditOverviewComponent, TrainingDefinitionEditComponent],
    providers: [TrainingDefinitionCanDeactivate],
})
export class CommonTrainingDefinitionEditOverviewComponentsModule {
    public static TRAINING_TYPE_TOKEN = new InjectionToken<TrainingTypeEnum>('TRAINING_TYPE_TOKEN');

    static forRoot(
        trainingType: TrainingTypeEnum,
    ): ModuleWithProviders<CommonTrainingDefinitionEditOverviewComponentsModule> {
        return {
            ngModule: CommonTrainingDefinitionEditOverviewComponentsModule,
            providers: [{ provide: this.TRAINING_TYPE_TOKEN, useValue: trainingType }],
        };
    }
}
