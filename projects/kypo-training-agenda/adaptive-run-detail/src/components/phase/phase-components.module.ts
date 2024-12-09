import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KypoTopologyGraphModule } from '@muni-kypo-crp/topology-graph';
import { PhaseMaterialModule } from './phase-material.module';
import { AbstractPhaseComponent } from './abstract-phase.component';
import { InfoPhaseComponent } from './info-phase/info-phase.component';
import { QuestionnairePhaseComponent } from './questionnaire-phase/questionnaire-phase.component';
import { TrainingPhaseComponent } from './training-phase/training-phase.component';
import { AccessPhaseComponent } from './access-phase/access-phase.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MarkedOptions, SentinelMarkdownViewModule } from '@sentinel/components/markdown-view';
import { LevelComponentsModule } from '../../../../run-detail/src/components/level/level-components.module';
import { AdaptiveFloatingAnswerFormComponent } from '../answer-floating-form/adaptive-floating-answer-form.component';
import { AdaptiveAnswerFormHintsComponent } from '../answer-floating-form/answer-form-hints/adaptive-answer-form-hints.component';

const markdownParserConfig = {
  markedOptions: {
    provide: MarkedOptions,
    useValue: {
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      smartLists: true,
      smartypants: false,
    },
  },
};

/**
 * Module containing training run level component declarations and necessary imports for the components
 */
@NgModule({
  imports: [
    CommonModule,
    SentinelMarkdownViewModule.forRoot(markdownParserConfig),
    KypoTopologyGraphModule,
    FormsModule,
    PhaseMaterialModule,
    MatTabsModule,
    LevelComponentsModule,
  ],
  declarations: [
    AbstractPhaseComponent,
    InfoPhaseComponent,
    TrainingPhaseComponent,
    AccessPhaseComponent,
    QuestionnairePhaseComponent,
    AdaptiveAnswerFormHintsComponent,
    AdaptiveFloatingAnswerFormComponent,
  ],
  exports: [
    AbstractPhaseComponent,
    InfoPhaseComponent,
    TrainingPhaseComponent,
    AccessPhaseComponent,
    QuestionnairePhaseComponent,
    AdaptiveAnswerFormHintsComponent,
    AdaptiveFloatingAnswerFormComponent,
  ],
})
export class PhaseComponentsModule {}
