import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { SentinelControlItem } from '@sentinel/components/controls';
import { Phase, TrainingDefinition } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { TrainingDefinitionEditControls } from '../model/adapters/training-definition-edit-controls';
import { TrainingDefinitionChangeEvent } from '../model/events/training-definition-change-event';
import { TrainingAgendaContext } from '@muni-kypo-crp/training-agenda/internal';
import { AdaptiveDefinitionEditService } from '../services/state/edit/adaptive-definition-edit.service';
import { ADAPTIVE_DEFINITION_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';

/**
 * Main smart component of training definition edit/new page.
 */
@Component({
  selector: 'kypo-adaptive-definition-detail',
  templateUrl: './adaptive-definition-edit-overview.component.html',
  styleUrls: ['./adaptive-definition-edit-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdaptiveDefinitionEditOverviewComponent extends SentinelBaseDirective {
  trainingDefinition$: Observable<TrainingDefinition>;
  editMode$: Observable<boolean>;
  tdTitle$: Observable<string>;
  phasesCount = -1;
  saveDisabled$: Observable<boolean>;
  unsavedPhases: Phase[] = [];
  canDeactivateAuthors = true;
  canDeactivateTDEdit = true;
  defaultPaginationSize: number;
  controls: SentinelControlItem[];

  constructor(
    private activeRoute: ActivatedRoute,
    private context: TrainingAgendaContext,
    private editService: AdaptiveDefinitionEditService
  ) {
    super();
    this.defaultPaginationSize = this.context.config.defaultPaginationSize;
    this.trainingDefinition$ = this.editService.trainingDefinition$;
    this.tdTitle$ = this.editService.trainingDefinition$.pipe(map((td) => td.title));
    this.saveDisabled$ = this.editService.saveDisabled$;
    this.activeRoute.data
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((data) => this.editService.set(data[ADAPTIVE_DEFINITION_DATA_ATTRIBUTE_NAME]));
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
    return this.canDeactivateTDEdit && this.canDeactivateAuthors && this.unsavedPhases.length <= 0;
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
   * Changes state of the component when one of the phase is saved
   * @param unsavedPhases unsaved phase emitted from child component
   */
  onUnsavedPhasesChanged(unsavedPhases: Phase[]): void {
    this.unsavedPhases = unsavedPhases;
  }

  /**
   * Changes state of the component when phase is added or deleted
   * @param count new count of phase
   */
  onPhasesCountChanged(count: number): void {
    this.phasesCount = count;
  }

  /**
   * Changes state of the component when authors of the training definition are changed
   * @param hasUnsavedChanges true if the child component has unsaved, false otherwise
   */
  onAuthorsChanged(hasUnsavedChanges: boolean): void {
    this.canDeactivateAuthors = !hasUnsavedChanges;
  }
}
