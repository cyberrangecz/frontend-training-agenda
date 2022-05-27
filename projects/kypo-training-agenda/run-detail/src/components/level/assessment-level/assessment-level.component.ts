import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { AssessmentTypeEnum } from '@muni-kypo-crp/training-model';
import { AssessmentLevel } from '@muni-kypo-crp/training-model';
import { Question } from '@muni-kypo-crp/training-model';
import { take } from 'rxjs/operators';
import { TraineeQuestionComponent } from './question/trainee-question.component';
import { TrainingRunAssessmentLevelService } from '../../../services/training-run/level/assessment/training-run-assessment-level.service';
import { TrainingRunAssessmentLevelConcreteService } from '../../../services/training-run/level/assessment/training-run-assessment-level-concrete.service';

@Component({
  selector: 'kypo-assessment-level',
  templateUrl: './assessment-level.component.html',
  styleUrls: ['./assessment-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: TrainingRunAssessmentLevelService, useClass: TrainingRunAssessmentLevelConcreteService }],
})
/**
 * Component that displays assessment level in a trainees training run. If the questions are type of test, trainee needs
 * to answer all of the questions before he can continue to the next level. If it questionnaire type, trainee can skip
 * answering the questions.
 */
export class AssessmentLevelComponent extends SentinelBaseDirective implements OnInit, OnChanges, AfterViewInit {
  @Input() level: AssessmentLevel;
  @Input() isLast: boolean;
  @Input() isLevelAnswered: boolean;
  @Input() isBacktracked: boolean;
  @Output() next: EventEmitter<void> = new EventEmitter();
  @ViewChildren(TraineeQuestionComponent) questionComponents: QueryList<TraineeQuestionComponent>;
  @ViewChild('controls', { read: ElementRef }) controlsPanel: ElementRef;
  @ViewChild('content', { read: ElementRef, static: false }) content: ElementRef;

  canSubmit: boolean;

  constructor(private assessmentService: TrainingRunAssessmentLevelService) {
    super();
  }

  ngOnInit(): void {
    this.initCanSubmit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes) {
      this.initCanSubmit();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setContentMargin();
  }

  ngAfterViewInit(): void {
    this.setContentMargin();
  }

  /**
   * When user changes his answers, check if answers are valid (and can be submitted) is done
   */
  onContentChanged(): void {
    this.checkCanSubmit();
  }

  /**
   * Gathers all trainees answers and calls service to save then
   */
  submit(): void {
    const results: Question[] = [];
    this.questionComponents.forEach((component) => {
      component.saveChanges();
      results.push(component.question);
    });
    this.sendSubmitRequest(results);
  }

  /**
   * Emit event to next level to move to the next level
   */
  onNext(): void {
    this.next.emit();
  }

  private sendSubmitRequest(answers: Question[]) {
    this.assessmentService.submit(answers).pipe(take(1)).subscribe();
  }

  private checkCanSubmit() {
    this.canSubmit = this.questionComponents.toArray().every((component) => component.canBeSubmitted());
  }

  private initCanSubmit() {
    if (this.level.assessmentType === AssessmentTypeEnum.Test) {
      this.canSubmit = false;
      return;
    } else {
      if (this.level.questions.some((question) => question.required)) {
        this.canSubmit = false;
        return;
      }
    }
    this.canSubmit = true;
  }

  private setContentMargin(): void {
    this.content.nativeElement.setAttribute('style', `margin-bottom:${this.getControlsPanelOffset()}`);
  }

  // Workaround since position:sticky is not working due to overflow in mat-content
  private getControlsPanelOffset(): string {
    return this.controlsPanel?.nativeElement.offsetHeight + 'px';
  }
}
