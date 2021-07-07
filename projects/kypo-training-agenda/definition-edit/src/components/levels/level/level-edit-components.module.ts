import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SentinelControlsModule } from '@sentinel/components/controls';
import { SentinelFreeFormModule } from '@sentinel/components/free-form';
import { SentinelMarkdownEditorModule } from '@sentinel/components/markdown-editor';
import { SentinelStepperModule } from '@sentinel/components/stepper';
import { MarkedOptions } from 'ngx-markdown';
import { AbstractLevelEditComponent } from './abstract-level-edit.component';
import { AssessmentLevelEditComponent } from './assessment/assessment-level-edit.component';
import { QuestionEditComponent } from './assessment/question/detail/question-edit.component';
import { ExtendedMatchingItemsEditComponent } from './assessment/question/extended-matching-items/extended-matching-items-edit.component';
import { FreeFormQuestionEditComponent } from './assessment/question/free-form-question/free-form-question-edit.component';
import { MultipleChoiceQuestionEditComponent } from './assessment/question/multiple-choice-question/multiple-choice-question-edit.component';
import { QuestionsOverviewComponent } from './assessment/question/overview/questions-overview.component';
import { GameLevelEditComponent } from './game/game-level-edit.component';
import { HintDetailEditComponent } from './game/hint/detail/hint-detail-edit.component';
import { HintsOverviewComponent } from './game/hint/overview/hints-overview.component';
import { InfoLevelEditComponent } from './info/info-level-edit.component';
import { LevelEditMaterialModule } from './level-edit-material.module';

const markdownConfig = {
  markdownParser: {
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
  },
  markdownEditor: {
    fileUploadRestUrl: '',
  },
};

/**
 * Module containing components and providers related to level edit/detail
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SentinelFreeFormModule,
    SentinelMarkdownEditorModule.forRoot(markdownConfig),
    SentinelStepperModule,
    LevelEditMaterialModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    SentinelControlsModule,
  ],
  exports: [AbstractLevelEditComponent],
  declarations: [
    GameLevelEditComponent,
    InfoLevelEditComponent,
    AssessmentLevelEditComponent,
    AbstractLevelEditComponent,
    HintsOverviewComponent,
    HintDetailEditComponent,
    QuestionsOverviewComponent,
    QuestionEditComponent,
    FreeFormQuestionEditComponent,
    MultipleChoiceQuestionEditComponent,
    ExtendedMatchingItemsEditComponent,
  ],
  providers: [],
})
export class LevelEditComponentsModule {}
