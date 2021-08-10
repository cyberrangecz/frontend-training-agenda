import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { SentinelControlItem } from '@sentinel/components/controls';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';
import { Level } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { TrainingDefinitionEditControls } from '../model/adapters/training-definition-edit-controls';
import { TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';
import { TrainingDefinitionChangeEvent } from '../model/events/training-definition-change-event';
import { PaginationService } from '@muni-kypo-crp/training-agenda/internal';
import { TrainingDefinitionEditService } from '../services/state/edit/training-definition-edit.service';
import { SentinelUserAssignService } from '@sentinel/components/user-assign';
import { AuthorsAssignService } from '../services/state/authors-assign/authors-assign.service';
import { TrainingDefinitionEditConcreteService } from '../services/state/edit/training-definition-edit-concrete.service';

/**
 * Main smart component of training definition edit/new page.
 */
@Component({
  selector: 'kypo-training-definition-detail',
  templateUrl: './training-definition-edit-overview.component.html',
  styleUrls: ['./training-definition-edit-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: SentinelUserAssignService, useClass: AuthorsAssignService },
    { provide: TrainingDefinitionEditService, useClass: TrainingDefinitionEditConcreteService },
  ],
})
export class TrainingDefinitionEditOverviewComponent extends SentinelBaseDirective {
  trainingDefinition$: Observable<TrainingDefinition>;
  variantSandboxes$: Observable<boolean>;
  editMode$: Observable<boolean>;
  tdTitle$: Observable<string>;
  levelsCount = -1;
  saveDisabled$: Observable<boolean>;
  unsavedLevels: Level[] = [];
  canDeactivateAuthors = true;
  canDeactivateTDEdit = true;
  defaultPaginationSize: number;
  controls: SentinelControlItem[];

  constructor(
    private activeRoute: ActivatedRoute,
    private paginationService: PaginationService,
    private editService: TrainingDefinitionEditService
  ) {
    super();
    this.defaultPaginationSize = this.paginationService.getPagination();
    this.trainingDefinition$ = this.editService.trainingDefinition$;
    this.variantSandboxes$ = this.editService.variantSandboxes$;
    this.tdTitle$ = this.editService.trainingDefinition$.pipe(map((td) => td.title));
    this.saveDisabled$ = this.editService.saveDisabled$;
    this.activeRoute.data
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((data) => this.editService.set(data[TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME]));
    this.editMode$ = this.editService.editMode$.pipe(
      tap(
        (isEditMode) =>
          (this.controls = TrainingDefinitionEditControls.create(this.editService, isEditMode, this.saveDisabled$))
      )
    );
  }

  /**
   * Shows dialog asking the user if he really wants to leave the page after refresh or navigating to another page
   */
  @HostListener('window:beforeunload')
  canRefreshOrLeave(): boolean {
    return this.canDeactivate();
  }

  /**
   * Determines if all changes in sub components are saved and user can navigate to different page
   */
  canDeactivate(): boolean {
    return this.canDeactivateTDEdit && this.canDeactivateAuthors && this.unsavedLevels.length <= 0;
  }

  /**
   * Passes state of edited training definition to service and changes state of the component (canDeactivate)
   * @param $event training definition change event containing validity and new state
   */
  onTrainingDefinitionChanged($event: TrainingDefinitionChangeEvent): void {
    this.editService.change($event);
    this.canDeactivateTDEdit = false;
  }

  onControlsAction(control: SentinelControlItem): void {
    control.result$.pipe(takeWhile(() => this.isAlive)).subscribe(() => (this.canDeactivateTDEdit = true));
  }

  /**
   * Changes state of the component when one of the levels is saved
   * @param unsavedLevels unsaved levels emitted from child component
   */
  onUnsavedLevelsChanged(unsavedLevels: Level[]): void {
    this.unsavedLevels = unsavedLevels;
  }

  /**
   * Changes state of the component when level is added or deleted
   * @param count new count of levels
   */
  onLevelsCountChanged(count: number): void {
    this.levelsCount = count;
  }

  /**
   * Changes state of the component when authors of the training definition are changed
   * @param hasUnsavedChanges true if the child component has unsaved, false otherwise
   */
  onAuthorsChanged(hasUnsavedChanges: boolean): void {
    this.canDeactivateAuthors = !hasUnsavedChanges;
  }
}
