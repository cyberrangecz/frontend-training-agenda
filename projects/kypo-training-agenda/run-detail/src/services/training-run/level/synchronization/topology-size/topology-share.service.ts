import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class TopologyShareService {
  /**
   * Notify everyone that the topology size has changed
   *
   * @param topologySize - the new size of the topology, [width, height]
   */
  public abstract emitTopologySizeChange(topologySize: [number, number]): void;

  /**
   * Get observable of the topology size
   *
   * @returns Observable of the topology size as [width, height]
   */
  public abstract getTopologySize$(): Observable<[number, number]>;
}
