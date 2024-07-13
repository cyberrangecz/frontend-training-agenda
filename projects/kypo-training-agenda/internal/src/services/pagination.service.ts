import { Injectable } from '@angular/core';
import { TrainingAgendaContext } from './context/training-agenda-context.service';

type Pagination = { [id: string]: number };

@Injectable()
export class PaginationService {
  constructor(private context: TrainingAgendaContext) {}

  public readonly DEFAULT_PAGINATION = this.context.config.defaultPaginationSize;

  /**
   * Returns selected pagination size from local storage or default when none was selected yet
   * @param id id of the component
   */
  getPagination(id: string): number {
    return PaginationService.readPagination()[id] || this.DEFAULT_PAGINATION;
  }

  /**
   * Sets desired pagination for to local storage
   * @param id id of the component
   * @param paginationSize desired pagination
   */
  setPagination(id: string, paginationSize: number): void {
    const pagination = PaginationService.readPagination();
    pagination[id] = paginationSize;
    PaginationService.writePagination(pagination);
  }

  private static readPagination(): Pagination {
    const paginationStr = window.localStorage.getItem('pagination') || '{}';
    const paginationObj = JSON.parse(paginationStr);
    return typeof paginationObj === 'object' ? paginationObj : {};
  }

  private static writePagination(pagination: Pagination): void {
    window.localStorage.setItem('pagination', JSON.stringify(pagination));
  }
}
