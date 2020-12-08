import { Injectable } from '@angular/core';
import { RequestedPagination, PaginatedResource, SentinelPagination } from '@sentinel/common';
import { UserApi } from '@muni-kypo-crp/training-api';
import { Designer } from '@muni-kypo-crp/training-model';
import { SentinelUserAssignService } from '@sentinel/components/user-assign';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TrainingErrorHandler } from '@muni-kypo-crp/training-agenda';
import { TrainingAgendaContext, UserNameFilters } from '@muni-kypo-crp/training-agenda/internal';

/**
 * Designer/Author implementation of UserAssignService from user assign library.
 * Provides context, concrete data and API connection to generic service user assignment service
 */
@Injectable()
export class AuthorsAssignService extends SentinelUserAssignService {
  constructor(
    private userApi: UserApi,
    private context: TrainingAgendaContext,
    private errorHandler: TrainingErrorHandler
  ) {
    super();
  }

  private lastAssignedPagination: RequestedPagination;
  private lastAssignedFilter: string;
  private assignedUsersSubject: BehaviorSubject<PaginatedResource<Designer>> = new BehaviorSubject(this.initSubject());
  /**
   * Currently assigned users (authors)
   */
  assignedUsers$: Observable<PaginatedResource<Designer>> = this.assignedUsersSubject.asObservable();

  /***
   * Assigns designer to a resource (creates association)
   * @param resourceId id of resource (training definition for example)
   * @param users list of users (designers) to assign to a resource
   */
  assign(resourceId: number, users: Designer[]): Observable<any> {
    const userIds = users.map((user) => user.id);
    return this.callApiToAssign(resourceId, userIds);
  }

  /**
   * Assigns selected designed
   * @param resourceId id of resource to assign to
   */
  assignSelected(resourceId: number): Observable<any> {
    const userIds = this.selectedUsersToAssignSubject$.getValue().map((user) => user.id);
    return this.callApiToAssign(resourceId, userIds);
  }

  /**
   * Deletes association between selected authors and resource and refreshes observable of already assigned organizers or handles error
   * @param resourceId id of selected resource
   * @param users authors whose association should be deleted
   */
  unassign(resourceId: number, users: Designer[]): Observable<any> {
    const userIds = users.map((user) => user.id);
    return this.callApiToUnassign(resourceId, userIds);
  }

  /**
   * Deletes association between selected designers and resource
   * @param resourceId id of resource to unassign from
   */
  unassignSelected(resourceId: number): Observable<any> {
    const userIds = this.selectedAssignedUsersSubject$.getValue().map((user) => user.id);
    return this.callApiToUnassign(resourceId, userIds);
  }

  /**
   * Gets authors of specific resource and updates related observables or handles error
   * @param resourceId id of resource associated with authors
   * @param pagination requested pagination
   * @param filter username filter which should be applied on authors
   */
  getAssigned(
    resourceId: number,
    pagination: RequestedPagination,
    filter: string = null
  ): Observable<PaginatedResource<Designer>> {
    this.clearSelectedAssignedUsers();
    this.lastAssignedPagination = pagination;
    this.lastAssignedFilter = filter;
    this.hasErrorSubject$.next(false);
    this.isLoadingAssignedSubject.next(true);
    return this.userApi.getAuthors(resourceId, pagination, UserNameFilters.create(filter)).pipe(
      tap(
        (paginatedUsers) => {
          this.assignedUsersSubject.next(paginatedUsers);
          this.isLoadingAssignedSubject.next(false);
        },
        (err) => {
          this.errorHandler.emit(err, 'Fetching authors');
          this.isLoadingAssignedSubject.next(false);
          this.hasErrorSubject$.next(true);
        }
      )
    );
  }

  /**
   * Gets all designers which are not already authors of a selected resource or handles error.
   * @param resourceId id of selected resource
   * @param filter username filter which should be applied on designers
   */
  getAvailableToAssign(resourceId: number, filter: string = null): Observable<PaginatedResource<Designer>> {
    const paginationSize = 25;
    return this.userApi
      .getDesignersNotInTD(
        resourceId,
        new RequestedPagination(0, paginationSize, 'familyName', 'asc'),
        UserNameFilters.create(filter)
      )
      .pipe(tap({ error: (err) => this.errorHandler.emit(err, 'Fetching designers') }));
  }

  /**
   * Adds and removes associations between selected designers/authors and resource.
   * Refreshes observable of already assigned organizers or handles error
   * @param resourceId id of selected resource
   * @param additions designers to assign to selected resource
   * @param removals authors whose association with resource should be removed
   */
  update(resourceId: number, additions: Designer[], removals: Designer[]): Observable<any> {
    return this.userApi
      .updateAuthors(
        resourceId,
        additions.map((user) => user.id),
        removals.map((user) => user.id)
      )
      .pipe(
        tap({ error: (err) => this.errorHandler.emit(err, 'Updating authors') }),
        switchMap(() => this.getAssigned(resourceId, this.lastAssignedPagination, this.lastAssignedFilter))
      );
  }

  private callApiToAssign(resourceId: number, userIds: number[]): Observable<any> {
    return this.userApi.updateAuthors(resourceId, userIds, []).pipe(
      tap(
        () => this.clearSelectedUsersToAssign(),
        (err) => this.errorHandler.emit(err, 'Adding authors')
      ),
      switchMap(() => this.getAssigned(resourceId, this.lastAssignedPagination, this.lastAssignedFilter))
    );
  }

  private callApiToUnassign(resourceId: number, usersIds: number[]) {
    return this.userApi.updateAuthors(resourceId, [], usersIds).pipe(
      tap(
        () => this.clearSelectedAssignedUsers(),
        (err) => this.errorHandler.emit(err, 'Deleting authors from training definition')
      ),
      switchMap(() => this.getAssigned(resourceId, this.lastAssignedPagination, this.lastAssignedFilter))
    );
  }

  private initSubject(): PaginatedResource<Designer> {
    return new PaginatedResource([], new SentinelPagination(0, 0, this.context.config.defaultPaginationSize, 0, 0));
  }
}
