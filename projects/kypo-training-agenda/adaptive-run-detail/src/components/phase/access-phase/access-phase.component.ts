import {
  AfterViewInit,
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
import { AccessPhase } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { KypoTopologyErrorService } from '@muni-kypo-crp/topology-graph';
import { TrainingErrorHandler } from '@muni-kypo-crp/training-agenda';
import { take } from 'rxjs/operators';
import { AdaptiveRunAccessPhaseService } from './../../../services/adaptive-run/access-phase/adaptive-run-access-phase.service';
import { AdaptiveRunAccessPhaseConcreteService } from '../../../services/adaptive-run/access-phase/adaptive-run-access-phase-concrete.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kypo-access-phase',
  templateUrl: './access-phase.component.html',
  styleUrls: ['./access-phase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: AdaptiveRunAccessPhaseService, useClass: AdaptiveRunAccessPhaseConcreteService }],
})
export class AccessPhaseComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() phase: AccessPhase;
  @Input() isLast: boolean;
  @Input() isPhaseAnswered: boolean;
  @Input() isBacktracked: boolean;
  @Input() sandboxInstanceId: number;
  @Input() sandboxDefinitionId: number;
  @Input() localEnvironment: boolean;
  @Output() next: EventEmitter<void> = new EventEmitter();
  @ViewChild('rightPanel', { static: true }) rightPanelDiv: ElementRef;
  @ViewChild('content', { read: ElementRef, static: false }) content: ElementRef;
  @ViewChild('controls', { read: ElementRef }) controlsPanel: ElementRef;
  @ViewChild('controlsContainer', { static: false, read: ElementRef }) controlsContainer: ElementRef;

  topologyWidth: number;
  topologyHeight: number;
  isTopologyDisplayed: boolean;
  passkey: string;
  isCorrectPasskeySubmitted$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  controlsWrapped: boolean;
  destroyRef = inject(DestroyRef);

  constructor(
    private accessPhaseService: AdaptiveRunAccessPhaseService,
    private topologyErrorService: KypoTopologyErrorService,
    private errorHandler: TrainingErrorHandler
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.calculateTopologySize();
    this.setContentMargin();
    this.controlsWrapped = this.isWrapped();
  }

  ngOnInit(): void {
    this.initTopology();
    this.subscribeToTopologyErrorHandler();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('phase' in changes) {
      this.passkey = '';
      this.initTopology();
      this.accessPhaseService.init(this.isPhaseAnswered);
      this.isCorrectPasskeySubmitted$ = this.accessPhaseService.isCorrectPasskeySubmitted$;
      this.isLoading$ = this.accessPhaseService.isLoading$;
    }
  }

  ngAfterViewInit(): void {
    this.setContentMargin();
    this.controlsWrapped = this.isWrapped();
  }

  onNext(): void {
    this.next.emit();
  }

  submitPasskey(): void {
    this.accessPhaseService.submitPasskey(this.passkey).pipe(take(1)).subscribe();
    this.scrollToTop();
  }

  /**
   * Checks whether user confirmed passkey input with Enter
   * @param event keydown event
   */
  keyboardSubmitPasskey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.submitPasskey();
    }
  }

  download(): void {
    this.accessPhaseService.getAccessFile().pipe(take(1)).subscribe();
  }

  private calculateTopologySize() {
    this.topologyWidth = this.rightPanelDiv.nativeElement.getBoundingClientRect().width;
    this.topologyHeight = this.topologyWidth;
  }

  private initTopology() {
    this.isTopologyDisplayed =
      (this.sandboxInstanceId === null || this.sandboxInstanceId === undefined) &&
      (this.sandboxDefinitionId === null || this.sandboxDefinitionId === undefined);
    this.calculateTopologySize();
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

  // Workaround since position:sticky is not working due to overflow in mat-content
  private getControlsPanelOffset(): string {
    return this.controlsPanel?.nativeElement.offsetHeight + 'px';
  }

  private setContentMargin(): void {
    this.content.nativeElement.setAttribute('style', `margin-bottom:${this.getControlsPanelOffset()}`);
  }

  // Checks if items in control bar are wrapped based on their top offset
  isWrapped(): boolean {
    const elements = Array.from(this.controlsContainer.nativeElement.childNodes).filter(
      (elem: HTMLElement) => elem.offsetTop !== undefined
    );
    return elements.some((elem: HTMLElement) => elem.offsetTop !== (elements[0] as HTMLElement).offsetTop);
  }
}
