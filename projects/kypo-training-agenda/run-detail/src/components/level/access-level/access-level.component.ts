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
export class AccessLevelComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() level: AccessLevel;
  @Input() isLast: boolean;
  @Input() isLevelAnswered: boolean;
  @Input() isBacktracked: boolean;
  @Input() sandboxInstanceId: string;
  @Input() sandboxDefinitionId: number;
  @Input() localEnvironment: boolean;
  @Output() next: EventEmitter<void> = new EventEmitter();
  @ViewChild('topology') topology: ElementRef<HTMLDivElement>;

  topologyWidth: number;
  topologyHeight: number;
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
    this.subscribeToTopologyErrorHandler();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes) {
      this.calculateTopologySize();
      this.accessLevelService.init(this.isLevelAnswered);
      this.isCorrectPasskeySubmitted$ = this.accessLevelService.isCorrectPasskeySubmitted$;
      this.isLoading$ = this.accessLevelService.isLoading$;
    }
  }

  ngAfterViewInit(): void {
    this.calculateTopologySize();
  }

  onNext(): void {
    this.next.emit();
  }

  /**
   * Calls service to check whether the passkey is correct
   */
  onAnswerSubmitted(answer: string): void {
    this.accessLevelService.submitPasskey(answer).pipe(take(1)).subscribe();
  }

  /**
   * Calls service to download ssh access for user
   */
  download(): void {
    this.accessLevelService.getAccessFile().pipe(take(1)).subscribe();
  }

  private calculateTopologySize() {
    if (!this.topology) {
      return;
    }
    this.topologyWidth = this.topology.nativeElement.getBoundingClientRect().width;
    this.topologyHeight = this.topology.nativeElement.getBoundingClientRect().height + 32; //32 for ssh access button
  }

  private subscribeToTopologyErrorHandler() {
    this.topologyErrorService.error$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (event) => this.errorHandler.emit(event.err, event.action),
      error: (err) => this.errorHandler.emit(err, 'There is a problem with topology error handler.'),
    });
  }
}
