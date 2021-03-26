import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { AdaptiveAccessTokenDetailComponent } from './adaptive-access-token-detail.component';

/**
 * Module containing components and providers for the access token page
 */
@NgModule({
  imports: [CommonModule, RouterModule, MatProgressSpinnerModule],
  declarations: [AdaptiveAccessTokenDetailComponent],
})
export class AdaptiveAccessTokenDetailComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<AdaptiveAccessTokenDetailComponentsModule> {
    return {
      ngModule: AdaptiveAccessTokenDetailComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
