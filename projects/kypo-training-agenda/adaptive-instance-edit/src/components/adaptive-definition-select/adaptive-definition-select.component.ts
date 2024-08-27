import { ChangeDetectionStrategy, Component, DestroyRef, inject, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OffsetPaginationEvent, PaginatedResource } from '@sentinel/common/pagination';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';
import { TrainingDefinitionInfo } from '@muni-kypo-crp/training-model';
import { merge, Observable } from 'rxjs';
import { TrainingAgendaContext } from '@muni-kypo-crp/training-agenda/internal';
import { AdaptiveDefinitionOrganizerSelectConcreteService } from '../../services/state/training-definition-selector/adaptive-definition-organizer-select-concrete.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Popup dialog for associating training definitions with training instance
 */
@Component({
  selector: 'kypo-adaptive-definition-selector',
  templateUrl: './adaptive-definition-select.component.html',
  styleUrls: ['./adaptive-definition-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: 'releasedService', useClass: AdaptiveDefinitionOrganizerSelectConcreteService },
    { provide: 'unreleasedService', useClass: AdaptiveDefinitionOrganizerSelectConcreteService },
  ],
})
export class AdaptiveDefinitionSelectComponent implements OnInit {
  released$: Observable<PaginatedResource<TrainingDefinitionInfo>>;
  releasedHasError$: Observable<boolean>;
  unreleased$: Observable<PaginatedResource<TrainingDefinitionInfo>>;
  unreleasedHasError$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  selected: TrainingDefinitionInfo[] = [];
  destroyRef = inject(DestroyRef);

  protected readonly LIST_HEIGHT = Number.MAX_SAFE_INTEGER;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: TrainingDefinition,
    public dialogRef: MatDialogRef<AdaptiveDefinitionSelectComponent>,
    private context: TrainingAgendaContext,
    @Inject('releasedService') private releasedService: AdaptiveDefinitionOrganizerSelectConcreteService,
    @Inject('unreleasedService') private unreleasedService: AdaptiveDefinitionOrganizerSelectConcreteService
  ) {
    this.selected = [this.data];
  }

  ngOnInit(): void {
    const pagination = new OffsetPaginationEvent(0, Number.MAX_SAFE_INTEGER, 'title', 'asc');
    this.released$ = this.releasedService.resource$;
    this.releasedHasError$ = this.releasedService.hasError$;
    this.unreleased$ = this.unreleasedService.resource$;
    this.unreleasedHasError$ = this.unreleasedService.hasError$;
    this.isLoading$ = merge(this.releasedService.isLoading$, this.unreleasedService.isLoading$);
    this.releasedService.getAll(pagination, 'RELEASED').pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    this.unreleasedService.getAll(pagination, 'UNRELEASED').pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  /**
   * Calls service to fetch training definitions
   * @param pagination requested pagination
   * @param released true if released training definitions should be fetched, false if unreleased
   */
  fetch(pagination: OffsetPaginationEvent, released: boolean): void {
    if (released) {
      this.releasedService.getAll(pagination, 'RELEASED').pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    } else {
      this.unreleasedService.getAll(pagination, 'UNRELEASED').pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
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
