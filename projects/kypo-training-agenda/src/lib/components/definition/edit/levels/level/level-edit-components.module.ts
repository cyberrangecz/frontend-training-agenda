import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MarkdownEditorModule} from 'kypo2-markdown-editor';
import {Kypo2StepperModule} from 'kypo2-stepper';
import {FreeFormModule} from '../../../../shared/free-form.module';
import {AbstractLevelEditComponent} from './abstract-level-edit.component';
import {LevelEditMaterialModule} from './level-edit-material.module';
import {HttpClient} from '@angular/common/http';
import {MarkedOptions} from 'ngx-markdown';
import {KypoControlsModule} from 'kypo-controls';
import {MultipleChoiceQuestionEditComponent} from './assessment/question/multiple-choice-question/multiple-choice-question-edit.component';
import {ExtendedMatchingItemsEditComponent} from './assessment/question/extended-matching-items/extended-matching-items-edit.component';
import {FreeFormQuestionEditComponent} from './assessment/question/free-form-question/free-form-question-edit.component';
import {QuestionEditComponent} from './assessment/question/detail/question-edit.component';
import {QuestionsOverviewComponent} from './assessment/question/overview/questions-overview.component';
import {HintDetailEditComponent} from './game/hint/detail/hint-detail-edit.component';
import {HintsOverviewComponent} from './game/hint/overview/hints-overview.component';
import {AssessmentLevelEditComponent} from './assessment/assessment-level-edit.component';
import {InfoLevelEditComponent} from './info/info-level-edit.component';
import {GameLevelEditComponent} from './game/game-level-edit.component';

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
          sanitize: true,
          smartLists: true,
          smartypants: false,
        },
      }
    },
    markdownEditor: {
      fileUploadRestUrl: ''
    }
  };

/**
 * Module containing components and providers related to level edit/detail
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MarkdownEditorModule.forRoot(markdownConfig),
        Kypo2StepperModule,
        LevelEditMaterialModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        FreeFormModule,
        KypoControlsModule
    ],
  exports: [
    AbstractLevelEditComponent
  ],
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
  providers: [
  ]
})

export class LevelEditComponentsModule {

}
