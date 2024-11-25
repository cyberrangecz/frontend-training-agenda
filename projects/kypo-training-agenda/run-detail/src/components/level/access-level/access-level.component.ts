import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AccessLevel } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { KypoTopologyErrorService } from '@muni-kypo-crp/topology-graph';
import { TrainingErrorHandler } from '@muni-kypo-crp/training-agenda';
import { TrainingRunAccessLevelService } from '../../../services/training-run/level/access/training-run-access-level.service';
import { TrainingRunAccessLevelConcreteService } from '../../../services/training-run/level/access/training-run-access-level-concrete.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kypo-access-level',
  templateUrl: './access-level.component.html',
  styleUrls: ['./access-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: TrainingRunAccessLevelService, useClass: TrainingRunAccessLevelConcreteService }],
})
/**
 * Component to display training run's level of type ACCESS. Only displays markdown and allows user to continue immediately.
 */
export class AccessLevelComponent implements OnInit, OnChanges {
  @Input() level: AccessLevel;
  @Input() isLast: boolean;
  @Input() isLevelAnswered: boolean;
  @Input() isBacktracked: boolean;
  @Input() sandboxInstanceId: string;
  @Input() sandboxDefinitionId: number;
  @Input() localEnvironment: boolean;
  @Output() next: EventEmitter<void> = new EventEmitter();
  @ViewChild('rightPanel', { static: true }) rightPanelDiv: ElementRef;
  @ViewChild('controls', { read: ElementRef }) controlsPanel: ElementRef;
  @ViewChild('controlsContainer', { static: false, read: ElementRef }) controlsContainer: ElementRef;
  @ViewChild('content', { read: ElementRef, static: false }) content: ElementRef;

  topologyWidth: number;
  topologyHeight: number;
  isTopologyDisplayed: boolean;
  isCorrectPasskeySubmitted$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  destroyRef = inject(DestroyRef);

  constructor(
    private accessLevelService: TrainingRunAccessLevelService,
    private topologyErrorService: KypoTopologyErrorService,
    private errorHandler: TrainingErrorHandler,
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.calculateTopologySize();
  }

  ngOnInit(): void {
    this.initTopology();
    this.subscribeToTopologyErrorHandler();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes) {
      this.initTopology();
      this.accessLevelService.init(this.isLevelAnswered);
      this.isCorrectPasskeySubmitted$ = this.accessLevelService.isCorrectPasskeySubmitted$;
      this.isLoading$ = this.accessLevelService.isLoading$;
    }
  }

  onNext(): void {
    this.next.emit();
  }

  /**
   * Calls service to check whether the passkey is correct
   */
  submitPasskey(passkey: string): void {
    this.accessLevelService.submitPasskey(passkey).pipe(take(1)).subscribe();
    this.scrollToTop();
  }

  /**
   * Calls service to download ssh access for user
   */
  download(): void {
    this.accessLevelService.getAccessFile().pipe(take(1)).subscribe();
  }

  private initTopology() {
    this.isTopologyDisplayed =
      (this.sandboxInstanceId === null || this.sandboxInstanceId === undefined) &&
      (this.sandboxDefinitionId === null || this.sandboxDefinitionId === undefined);
    this.calculateTopologySize();
  }

  private calculateTopologySize() {
    this.topologyWidth = this.rightPanelDiv.nativeElement.getBoundingClientRect().width;
    this.topologyHeight = this.topologyWidth;
  }

  private subscribeToTopologyErrorHandler() {
    this.topologyErrorService.error$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (event) => this.errorHandler.emit(event.err, event.action),
      error: (err) => this.errorHandler.emit(err, 'There is a problem with topology error handler.'),
    });
  }

  private scrollToTop(): void {
    window.scrollTo({
      left: 0,
      top: 0,
    });
  }
}
