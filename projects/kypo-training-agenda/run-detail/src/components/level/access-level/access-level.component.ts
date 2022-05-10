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
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { AccessLevel } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { take, takeWhile } from 'rxjs/operators';
import { Kypo2TopologyErrorService } from '@muni-kypo-crp/topology-graph';
import { TrainingErrorHandler } from '@muni-kypo-crp/training-agenda';
import { TrainingRunAccessLevelService } from '../../../services/training-run/level/access/training-run-access-level.service';
import { TrainingRunAccessLevelConcreteService } from '../../../services/training-run/level/access/training-run-access-level-concrete.service';

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
export class AccessLevelComponent extends SentinelBaseDirective implements OnInit, OnChanges, AfterViewInit {
  @Input() level: AccessLevel;
  @Input() isLast: boolean;
  @Input() isBacktracked: boolean;
  @Input() sandboxInstanceId: number;
  @Input() sandboxDefinitionId: number;
  @Input() localEnvironment: boolean;
  @Output() next: EventEmitter<void> = new EventEmitter();
  @ViewChild('rightPanel', { static: true }) rightPanelDiv: ElementRef;
  @ViewChild('levelContent') private levelContent: ElementRef;
  @ViewChild('controls', { read: ElementRef }) controlsPanel: ElementRef;
  @ViewChild('controlsContainer', { static: false, read: ElementRef }) controlsContainer: ElementRef;
  @ViewChild('content', { read: ElementRef, static: false }) content: ElementRef;

  topologyWidth: number;
  topologyHeight: number;
  isTopologyDisplayed: boolean;
  passkey: string;
  isCorrectPasskeySubmitted$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  controlsWrapped: boolean;

  constructor(
    private accessLevelService: TrainingRunAccessLevelService,
    private topologyErrorService: Kypo2TopologyErrorService,
    private errorHandler: TrainingErrorHandler
  ) {
    super();
  }

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
    if ('level' in changes) {
      this.initTopology();
      this.passkey = '';
      this.accessLevelService.init();
      this.isCorrectPasskeySubmitted$ = this.accessLevelService.isCorrectPasskeySubmitted$;
      this.isLoading$ = this.accessLevelService.isLoading$;
    }
  }

  ngAfterViewInit(): void {
    this.setContentMargin();
    this.controlsWrapped = this.isWrapped();
  }

  onNext(): void {
    this.next.emit();
  }

  /**
   * Calls service to check whether the passkey is correct
   */
  submitPasskey(): void {
    this.accessLevelService.submitPasskey(this.passkey).pipe(take(1)).subscribe();
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
    this.topologyErrorService.error$.pipe(takeWhile(() => this.isAlive)).subscribe({
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

  private setContentMargin(): void {
    this.content.nativeElement.setAttribute('style', `margin-bottom:${this.getControlsPanelOffset()}`);
  }

  // Workaround since position:sticky is not working due to overflow in mat-content
  private getControlsPanelOffset(): string {
    return this.controlsPanel?.nativeElement.offsetHeight + 'px';
  }

  // Checks if items in control bar are wrapped based on their top offset
  isWrapped(): boolean {
    const elements = Array.from(this.controlsContainer.nativeElement.childNodes).filter(
      (elem: HTMLElement) => elem.offsetTop !== undefined
    );
    return elements.some((elem: HTMLElement) => elem.offsetTop !== (elements[0] as HTMLElement).offsetTop);
  }
}
