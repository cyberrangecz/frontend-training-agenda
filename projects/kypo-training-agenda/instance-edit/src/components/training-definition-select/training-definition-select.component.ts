import { ChangeDetectionStrategy, Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SentinelBaseDirective, RequestedPagination, PaginatedResource } from '@sentinel/common';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';
import { TrainingDefinitionInfo } from '@muni-kypo-crp/training-model';
import { merge, Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { PaginationService } from '@muni-kypo-crp/training-agenda/internal';
import { TrainingDefinitionOrganizerSelectConcreteService } from '../../services/state/training-definition-selector/training-definition-organizer-select-concrete.service';

/**
 * Popup dialog for associating training definitions with training instance
 */
@Component({
  selector: 'kypo-training-definition-selector',
  templateUrl: './training-definition-select.component.html',
  styleUrls: ['./training-definition-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: 'releasedService', useClass: TrainingDefinitionOrganizerSelectConcreteService },
    { provide: 'unreleasedService', useClass: TrainingDefinitionOrganizerSelectConcreteService },
  ],
})
export class TrainingDefinitionSelectComponent extends SentinelBaseDirective implements OnInit {
  readonly PAGE_SIZE;

  released$: Observable<PaginatedResource<TrainingDefinitionInfo>>;
  releasedHasError$: Observable<boolean>;
  unreleased$: Observable<PaginatedResource<TrainingDefinitionInfo>>;
  unreleasedHasError$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  selected: TrainingDefinitionInfo[] = [];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: TrainingDefinition,
    public dialogRef: MatDialogRef<TrainingDefinitionSelectComponent>,
    private paginationService: PaginationService,
    @Inject('releasedService') private releasedService: TrainingDefinitionOrganizerSelectConcreteService,
    @Inject('unreleasedService') private unreleasedService: TrainingDefinitionOrganizerSelectConcreteService
  ) {
    super();
    this.PAGE_SIZE = this.paginationService.getPagination();
    this.selected = [this.data];
  }

  ngOnInit(): void {
    const pagination = new RequestedPagination(0, this.PAGE_SIZE, 'title', 'asc');
    this.released$ = this.releasedService.resource$;
    this.releasedHasError$ = this.releasedService.hasError$;
    this.unreleased$ = this.unreleasedService.resource$;
    this.unreleasedHasError$ = this.unreleasedService.hasError$;
    this.isLoading$ = merge(this.releasedService.isLoading$, this.unreleasedService.isLoading$);
    this.releasedService
      .getAll(pagination, 'RELEASED')
      .pipe(takeWhile(() => this.isAlive))
      .subscribe();
    this.unreleasedService
      .getAll(pagination, 'UNRELEASED')
      .pipe(takeWhile(() => this.isAlive))
      .subscribe();
  }

  /**
   * Calls service to fetch training definitions
   * @param pagination requested pagination
   * @param released true if released training definitions should be fetched, false if unreleased
   */
  fetch(pagination: RequestedPagination, released: boolean): void {
    if (released) {
      this.releasedService
        .getAll(pagination, 'RELEASED')
        .pipe(takeWhile(() => this.isAlive))
        .subscribe();
    } else {
      this.unreleasedService
        .getAll(pagination, 'UNRELEASED')
        .pipe(takeWhile(() => this.isAlive))
        .subscribe();
    }
  }

  /**
   * Closes the dialog window and passes the selected option to its parent component
   */
  confirm(): void {
    const result = {
      type: 'confirm',
      trainingDef: this.selected[0],
    };
    this.dialogRef.close(result);
  }

  /**
   * Closes the dialog window without passing the selected option
   */
  cancel(): void {
    const result = {
      type: 'cancel',
      sandboxDef: null,
    };
    this.dialogRef.close(result);
  }

  /**
   * Updated selected training definition
   * @param selected selected training definition
   */
  onSelectionChange(selected: TrainingDefinitionInfo[]): void {
    this.selected = selected;
  }
}
