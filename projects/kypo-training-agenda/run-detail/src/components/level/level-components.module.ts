import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Kypo2TopologyGraphModule } from '@muni-kypo-crp/topology-graph';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { NextLevelButtonComponent } from '../next-level-button/next-level-button.component';
import { AbstractLevelComponent } from './abstract-level.component';
import { AssessmentLevelComponent } from './assessment-level/assessment-level.component';
import { ExtendedMatchingItemsTraineeComponent } from './assessment-level/question/extended-matching-items/extended-matching-items-trainee.component';
import { FreeFormQuestionTraineeComponent } from './assessment-level/question/free-form-question/free-form-question-trainee.component';
import { MultipleChoiceQuestionTraineeComponent } from './assessment-level/question/multiple-choice-question/multiple-choice-question-trainee.component';
import { TraineeQuestionComponent } from './assessment-level/question/trainee-question.component';
import { GameLevelComponent } from './game-level/game-level.component';
import { InfoLevelComponent } from './info-level/info-level.component';
import { LevelMaterialModule } from './level-material.module';

const markdownParserConfig = {
  loader: HttpClient,
  markedOptions: {
    provide: MarkedOptions,
    useValue: {
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
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
    FormsModule,
    LevelMaterialModule,
  ],
  declarations: [
    NextLevelButtonComponent,
    AbstractLevelComponent,
    InfoLevelComponent,
    GameLevelComponent,
    AssessmentLevelComponent,
    TraineeQuestionComponent,
    FreeFormQuestionTraineeComponent,
    MultipleChoiceQuestionTraineeComponent,
    ExtendedMatchingItemsTraineeComponent,
  ],
  exports: [
    AbstractLevelComponent,
    InfoLevelComponent,
    GameLevelComponent,
    AssessmentLevelComponent,
    TraineeQuestionComponent,
    FreeFormQuestionTraineeComponent,
    MultipleChoiceQuestionTraineeComponent,
    ExtendedMatchingItemsTraineeComponent,
  ],
})
export class LevelComponentsModule {}
