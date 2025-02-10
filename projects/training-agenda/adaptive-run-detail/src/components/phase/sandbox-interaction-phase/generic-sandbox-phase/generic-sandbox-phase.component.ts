import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { DividerPositionSynchronizerService } from '../../../../services/adaptive-run/synchronization/divider-position/divider-position-synchronizer.service';
import { TopologySizeSynchronizerService } from '../../../../services/adaptive-run/synchronization/topology-size/topology-size-synchronizer.service';
import { AnswerFormHintsComponent } from '../subcomponents/answer-floating-form/answer-form-hints/answer-form-hints.component';

@Component({
  selector: 'crczp-generic-sandbox-phase',
  templateUrl: './generic-sandbox-phase.component.html',
  styleUrl: './generic-sandbox-phase.component.css',
})
export class GenericSandboxPhaseComponent implements AfterViewInit, OnChanges {
  @Input({ required: true }) levelContent: string;

  @Input() isLast: boolean;
  @Input() isBacktracked: boolean;
  @Input() isStepperDisplayed: boolean;
  @Input() isLoading: Observable<boolean> = of(false);
  @Input() isSolutionRevealed$: Observable<boolean> = of(false);
  @Input() isCorrectAnswerSubmitted$: Observable<boolean> = of(false);

  @Input() sandboxInstanceId: string;
  @Input() sandboxDefinitionId: number;

  @Input() displayedSolutionContent$: Observable<string> = of();
  @Input() hints!: TemplateRef<AnswerFormHintsComponent>;

  @Output() getAccessFile: EventEmitter<void> = new EventEmitter();
  @Output() next: EventEmitter<void> = new EventEmitter();
  @Output() answerSubmitted: EventEmitter<string> = new EventEmitter();

  @ViewChild('rightPanel') rightPanel: ElementRef<HTMLDivElement>;

  destroyRef = inject(DestroyRef);

  private lastWindowDimensions: [number, number] = [window.innerWidth, window.innerHeight];
  private readonly windowResizeThreshold = 5;

  constructor(
    protected dividerPositionSynchronizer: DividerPositionSynchronizerService,
    protected topologySizeSynchronizer: TopologySizeSynchronizerService,
  ) {}

  ngAfterViewInit(): void {
    this.emitTopologySizeChange();
  }

  /**
   * Listens to window resize event and updates topology
   * every {@link windowResizeThreshold} pixels
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (
      Math.abs(this.lastWindowDimensions[0] - window.innerWidth) > this.windowResizeThreshold ||
      Math.abs(this.lastWindowDimensions[1] - window.innerHeight) > this.windowResizeThreshold
    ) {
      this.emitTopologySizeChange();
      this.lastWindowDimensions = [window.innerWidth, window.innerHeight];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes) {
      this.emitTopologySizeChange();
    }
  }

  emitTopologySizeChange(): void {
    if (
      !this.rightPanel ||
      !this.rightPanel.nativeElement ||
      this.rightPanel.nativeElement.getBoundingClientRect().width <= 1
    ) {
      return;
    }
    this.topologySizeSynchronizer.emitTopologySizeChange([
      this.rightPanel.nativeElement.getBoundingClientRect().width,
      this.rightPanel.nativeElement.getBoundingClientRect().height,
    ]);
  }

  protected readonly window = window;
}
