import { Injectable } from '@angular/core';
import { TrainingAgendaContext } from './context/training-agenda-context.service';

@Injectable()
export class PaginationService {
  constructor(private context: TrainingAgendaContext) {}

  public readonly DEFAULT_PAGINATION = this.context.config.defaultPaginationSize;

  /**
   * Returns selected pagination size from local storage or default when none was selected yet
   * @param id id of the component
   */
  getPagination(id: string): number {
    return this.readPaginationMap().get(id) || this.DEFAULT_PAGINATION;
  }

  /**
   * Sets desired pagination for to local storage
   * @param id id of the component
   * @param pagination desired pagination
   */
  setPagination(id: string, pagination: number): void {
    const paginationMap = this.readPaginationMap();
    paginationMap.set(id, pagination);
    this.writePaginationMap(paginationMap);
  }

  private readPaginationMap(): Map<string, number> {
    const pagination = JSON.parse(window.localStorage.getItem('pagination')) as Map<string, number>;
    return pagination || new Map<string, number>();
  }

  private writePaginationMap(pagination: Map<string, number>): void {
    window.localStorage.setItem('pagination', JSON.stringify(pagination));
  }
}
