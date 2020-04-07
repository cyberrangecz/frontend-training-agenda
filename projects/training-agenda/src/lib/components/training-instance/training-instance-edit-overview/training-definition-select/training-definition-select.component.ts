import {ChangeDetectionStrategy, Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TrainingDefinition} from 'kypo-training-model';
import {TrainingDefinitionInfo} from 'kypo-training-model';
import {KypoBaseComponent, KypoRequestedPagination} from 'kypo-common';
import {merge, Observable} from 'rxjs';
import {KypoPaginatedResource} from 'kypo-common';
import {takeWhile} from 'rxjs/operators';
import {TrainingDefinitionOrganizerSelectConcreteService} from '../../../../services/training-instance/training-definition-selector/training-definition-organizer-select-concrete.service';
import {TrainingAgendaContext} from '../../../../services/internal/training-agenda-context.service';

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
    { provide: 'unreleasedService', useClass: TrainingDefinitionOrganizerSelectConcreteService }
  ]
})
export class TrainingDefinitionSelectComponent extends KypoBaseComponent implements OnInit {

  readonly PAGE_SIZE;

  released$: Observable<KypoPaginatedResource<TrainingDefinitionInfo>>;
  releasedHasError$: Observable<boolean>;
  unreleased$: Observable<KypoPaginatedResource<TrainingDefinitionInfo>>;
  unreleasedHasError$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  selected: TrainingDefinitionInfo;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: TrainingDefinition,
              public dialogRef: MatDialogRef<TrainingDefinitionSelectComponent>,
              private context: TrainingAgendaContext,
              @Inject('releasedService') private releasedService: TrainingDefinitionOrganizerSelectConcreteService,
              @Inject('unreleasedService') private unreleasedService: TrainingDefinitionOrganizerSelectConcreteService) {
    super();
    this.PAGE_SIZE = this.context.config.defaultPaginationSize;
    this.selected = this.data;
  }

  ngOnInit() {
    const pagination = new KypoRequestedPagination(0, this.PAGE_SIZE, 'title', 'asc');
    this.released$ = this.releasedService.resource$;
    this.releasedHasError$ = this.releasedService.hasError$;
    this.unreleased$ = this.unreleasedService.resource$;
    this.unreleasedHasError$ = this.unreleasedService.hasError$;
    this.isLoading$ = merge(this.releasedService.isLoading$, this.unreleasedService.isLoading$);
    this.releasedService.getAll(pagination, 'RELEASED')
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe();
    this.unreleasedService.getAll(pagination, 'UNRELEASED')
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe();
  }

  /**
   * Calls service to fetch training definitions
   * @param pagination requested pagination
   * @param released true if released training definitions should be fetched, false if unreleased
   */
  fetch(pagination: KypoRequestedPagination, released: boolean) {
    if (released) {
      this.releasedService.getAll(pagination, 'RELEASED')
        .pipe(
          takeWhile(_ => this.isAlive)
        ).subscribe();
    } else {
      this.unreleasedService.getAll(pagination, 'UNRELEASED')
        .pipe(
          takeWhile(_ => this.isAlive)
        ).subscribe();
    }
  }

  /**
   * Closes the dialog window and passes the selected option to its parent component
   */
  confirm() {
    const result = {
      type: 'confirm',
      trainingDef: this.selected
    };
    this.dialogRef.close(result);
  }

  /**
   * Closes the dialog window without passing the selected option
   */
  cancel() {
    const result = {
      type: 'cancel',
      sandboxDef: null
    };
    this.dialogRef.close(result);
  }

  /**
   * Updated selected training definition
   * @param selected selected training definition
   */
  onSelectionChange(selected: TrainingDefinitionInfo) {
    this.selected = selected;
  }
}
