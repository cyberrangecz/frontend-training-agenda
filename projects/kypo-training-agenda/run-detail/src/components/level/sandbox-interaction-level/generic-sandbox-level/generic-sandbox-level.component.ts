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
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { LevelComponentsModule } from '../../level-components.module';
import { LevelMaterialModule } from '../../level-material.module';
import { MatButton } from '@angular/material/button';
import { SentinelMarkdownViewModule } from '@sentinel/components/markdown-view';
import { TopologyWrapperComponent } from '../subcomponents/topology-wrapper/topology-wrapper.component';
import { AnswerFormHintsComponent } from '../subcomponents/answer-floating-form/answer-form-hints/answer-form-hints.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { HintButton } from '@muni-kypo-crp/training-agenda/internal';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TrainingRunTrainingLevelService } from '@muni-kypo-crp/training-agenda/run-detail';
import { DividerPositionSynchronizerService } from '../../../../services/training-run/level/synchronization/divider-position/divider-position-synchronizer.service';
import { TopologySizeSynchronizerService } from '../../../../services/training-run/level/synchronization/topology-size/topology-size-synchronizer.service';

@Component({
  selector: 'kypo-generic-sandbox-level',
  templateUrl: './generic-sandbox-level.component.html',
  styleUrl: './generic-sandbox-level.component.css',
})
export class GenericSandboxLevelComponent implements AfterViewInit, OnChanges {
  @Input() hints!: TemplateRef<AnswerFormHintsComponent>;
  @Input() isLast: boolean;
  @Input() isBacktracked: boolean;
  @Input() sandboxInstanceId: string;
  @Input() sandboxDefinitionId: number;
  @Input() isLoading: Observable<boolean>;

  @Input() isCorrectAnswerSubmitted$: Observable<boolean>;
  @Input() isSolutionRevealed$: Observable<boolean>;

  @Input() levelContent: string;
  @Input() displayedSolutionContent$: Observable<string>;
  @Input() displayedHintsContent$: Observable<string>;

  @Output() getAccessFile: EventEmitter<void> = new EventEmitter();
  @Output() next: EventEmitter<void> = new EventEmitter();
  @Output() answerSubmitted: EventEmitter<string> = new EventEmitter();

  @ViewChild('rightPanel') rightPanel: ElementRef<HTMLDivElement>;

  topologyWidth: BehaviorSubject<number> = new BehaviorSubject(undefined);
  topologyHeight: BehaviorSubject<number> = new BehaviorSubject(undefined);

  destroyRef = inject(DestroyRef);

  private lastWindowDimensions: [number, number] = [window.innerWidth, window.innerHeight];
  private readonly windowResizeThreshold = 5;

  constructor(
    protected dividerPositionSynchronizer: DividerPositionSynchronizerService,
    protected topologySizeSynchronizer: TopologySizeSynchronizerService,
  ) {}

  ngAfterViewInit(): void {
    this.setupTopologySizeListener();
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

  private setupTopologySizeListener(): void {
    this.topologySizeSynchronizer
      .getTopologySize$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([width, height]) => {
        this.topologyWidth.next(width);
        this.topologyHeight.next(height + 32); //32 for ssh access button
      });
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
}
