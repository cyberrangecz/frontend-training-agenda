import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingDefinitionSummaryComponent } from './training-definition-summary.component';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { TrainingDefintionSummaryMaterialModule } from './training-definition-summary-material.module';
import { RouterModule } from '@angular/router';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { AssessmentLevelDetailComponent } from './levels/level/assessment/assessment-level-detail.component';
import { InfoLevelDetailComponent } from './levels/level/info/info-level-detail.component';
import { TrainingLevelDetailComponent } from './levels/level/training/training-level-detail.component';
import { TrainingDefinitionLevelsDetailComponent } from './levels/training-definition-levels.component';
import { TrainingDefinitionInfoComponent } from './info/training-definition-info.component';
import { AbstractLevelDetailComponent } from './levels/level/abstract-level-detail.component';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { ExtendedMatchingQuestionDetailComponent } from './levels/level/assessment/abstract-question/extended-matching-question-detail/extended-matching-question-detail.component';
import { FreeFormQuestionDetailComponent } from './levels/level/assessment/abstract-question/free-form-question-detail/free-form-question-detail.component';
import { MultipleChoiceQuestionDetailComponent } from './levels/level/assessment/abstract-question/multiple-choice-question-detail/multiple-choice-question-detail.component';
import { AbstractQuestionComponent } from './levels/level/assessment/abstract-question/abstract-question.component';

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

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TrainingDefintionSummaryMaterialModule,
    MarkdownModule.forRoot(markdownParserConfig),
    SentinelControlsModule,
  ],
  declarations: [
    TrainingDefinitionSummaryComponent,
    TrainingDefinitionInfoComponent,
    TrainingDefinitionLevelsDetailComponent,
    InfoLevelDetailComponent,
    TrainingLevelDetailComponent,
    AssessmentLevelDetailComponent,
    AbstractLevelDetailComponent,
    ExtendedMatchingQuestionDetailComponent,
    FreeFormQuestionDetailComponent,
    MultipleChoiceQuestionDetailComponent,
    AbstractQuestionComponent,
  ],
})
export class TrainingDefinitionSummaryComponentsModule {
  static forRoot(config: TrainingAgendaConfig): ModuleWithProviders<TrainingDefinitionSummaryComponentsModule> {
    return {
      ngModule: TrainingDefinitionSummaryComponentsModule,
      providers: [{ provide: TrainingAgendaConfig, useValue: config }],
    };
  }
}
