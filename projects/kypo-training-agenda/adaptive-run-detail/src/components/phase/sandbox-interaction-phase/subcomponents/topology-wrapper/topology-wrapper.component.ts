import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { KypoTopologyErrorService } from '@cyberrangecz-platform/topology-graph';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TrainingErrorHandler } from '@cyberrangecz-platform/training-agenda';
import { TopologySizeSynchronizerService } from '../../../../../services/adaptive-run/synchronization/topology-size/topology-size-synchronizer.service';

class DefaultTopologyShareService extends TopologySizeSynchronizerService {
  private topologySizeSubject: BehaviorSubject<[number, number]>;

  constructor(initialSize: [number, number] = [0, 0]) {
    super();
    this.topologySizeSubject = new BehaviorSubject(initialSize);
  }

  emitTopologySizeChange(topologySize: [number, number]): void {
    this.topologySizeSubject.next(topologySize);
  }

  getTopologySize$(): Observable<[number, number]> {
    return this.topologySizeSubject.asObservable();
  }
}

@Component({
  selector: 'kypo-topology-wrapper',
  templateUrl: './topology-wrapper.component.html',
  styleUrl: './topology-wrapper.component.css',
})
export class TopologyWrapperComponent implements OnInit {
  @Input() loading: Observable<boolean> = of(false);
  @Input() sandboxInstanceId!: string;
  @Input() sandboxDefinitionId!: number;
  @Input() topologySizeSynchronizationService: TopologySizeSynchronizerService = new DefaultTopologyShareService([
    50, 50,
  ]);
  @Output() getAccessFile = new EventEmitter<void>();

  destroyRef = inject(DestroyRef);

  constructor(
    private topologyErrorService: KypoTopologyErrorService,
    private errorHandler: TrainingErrorHandler,
  ) {}

  getWidth$(): Observable<number> {
    return this.topologySizeSynchronizationService.getTopologySize$().pipe(map(([width, _]) => width));
  }

  getHeight$(): Observable<number> {
    return this.topologySizeSynchronizationService.getTopologySize$().pipe(map(([_, height]) => height));
  }

  ngOnInit(): void {
    this.subscribeToTopologyErrorHandler();
  }

  private subscribeToTopologyErrorHandler() {
    this.topologyErrorService.error$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (event) => this.errorHandler.emit(event.err, event.action),
      error: (err) => this.errorHandler.emit(err, 'There is a problem with topology error handler.'),
    });
  }
}
