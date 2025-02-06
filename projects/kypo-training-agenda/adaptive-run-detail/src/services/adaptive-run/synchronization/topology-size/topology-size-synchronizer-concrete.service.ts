import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, startWith } from 'rxjs';
import { TopologySizeSynchronizerService } from './topology-size-synchronizer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { unique } from '../../../../logic/unique';

@Injectable({
  providedIn: 'root',
})
export class TopologySizeSynchronizerConcreteService extends TopologySizeSynchronizerService {
  private topologySizeObservable = new BehaviorSubject(undefined);

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    super();
  }

  public emitTopologySizeChange(topologySize: [number, number]): void {
    this.topologySizeObservable.next(topologySize);
  }

  public getTopologySize$(): Observable<[number, number]> {
    return this.topologySizeObservable.pipe(
      takeUntilDestroyed(this.destroyRef),
      startWith(this.topologySizeObservable.value),
      filter((topologySize) => !!topologySize),
      unique((a, b) => a[0] === b[0] && a[1] === b[1]),
    );
  }
}
