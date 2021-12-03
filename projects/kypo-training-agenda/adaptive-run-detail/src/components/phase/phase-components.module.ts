import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Kypo2TopologyGraphModule, Kypo2TopologyLegendModule } from '@muni-kypo-crp/topology-graph';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { PhaseMaterialModule } from './phase-material.module';
import { NextPhaseButtonComponent } from '../next-phase-button/next-phase-button.component';
import { AbstractPhaseComponent } from './abstract-phase.component';
import { InfoPhaseComponent } from './info-phase/info-phase.component';
import { QuestionnairePhaseComponent } from './questionnaire-phase/questionnaire-phase.component';
import { TrainingPhaseComponent } from './training-phase/training-phase.component';

const markdownParserConfig = {
  loader: HttpClient,
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
    MarkdownModule.forRoot(markdownParserConfig),
    Kypo2TopologyGraphModule,
    Kypo2TopologyLegendModule,
    FormsModule,
    PhaseMaterialModule,
  ],
  declarations: [
    NextPhaseButtonComponent,
    AbstractPhaseComponent,
    InfoPhaseComponent,
    TrainingPhaseComponent,
    QuestionnairePhaseComponent,
  ],
  exports: [AbstractPhaseComponent, InfoPhaseComponent, TrainingPhaseComponent, QuestionnairePhaseComponent],
})
export class PhaseComponentsModule {}
