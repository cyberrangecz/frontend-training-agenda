import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { SentinelControlItem } from '@sentinel/components/controls';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { map, take, takeWhile, tap } from 'rxjs/operators';
import { TrainingInstanceEditControls } from '../model/adapter/training-instance-edit-controls';
import { TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';
import { TrainingInstanceChangeEvent } from '../model/events/training-instance-change-event';
import { PaginationService } from '@muni-kypo-crp/training-agenda/internal';
import { TrainingInstanceEditService } from '../services/state/edit/training-instance-edit.service';
import { TrainingInstanceEditConcreteService } from '../services/state/edit/training-instance-edit-concrete.service';
import { SentinelUserAssignService } from '@sentinel/components/user-assign';
import { OrganizersAssignService } from '../services/state/organizers-assign/organizers-assign.service';

/**
 * Main component of training instance edit/create page. Serves mainly as a smart component wrapper
 */
@Component({
  selector: 'kypo-training-instance-edit-overview',
  templateUrl: './training-instance-edit-overview.component.html',
  styleUrls: ['./training-instance-edit-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: TrainingInstanceEditService, useClass: TrainingInstanceEditConcreteService },
    { provide: SentinelUserAssignService, useClass: OrganizersAssignService },
  ],
})
export class TrainingInstanceEditOverviewComponent extends SentinelBaseDirective {
  trainingInstance$: Observable<TrainingInstance>;
  hasStarted$: Observable<boolean>;
  editMode$: Observable<boolean>;
  tiTitle$: Observable<string>;
  canDeactivateOrganizers = true;
  canDeactivatePoolAssign = true;
  canDeactivateTIEdit = true;
  defaultPaginationSize: number;
  controls: SentinelControlItem[];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private paginationService: PaginationService,
    private editService: TrainingInstanceEditService
  ) {
    super();
    this.defaultPaginationSize = this.paginationService.getPagination();
    this.trainingInstance$ = this.editService.trainingInstance$;
    this.hasStarted$ = this.editService.hasStarted$;
    this.tiTitle$ = this.editService.trainingInstance$.pipe(map((ti) => ti.title));
    this.activeRoute.data
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((data) => this.editService.set(data[TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]));
    this.controls = TrainingInstanceEditControls.create(this.editService, this.editService.saveDisabled$);
  }

  /**
   * Shows dialog asking the user if he really wants to leave the page after refresh or navigating to another page
   */
  @HostListener('window:beforeunload')
  canRefreshOrLeave(): boolean {
    return this.canDeactivateTIEdit && this.canDeactivateOrganizers;
  }

  onControlsAction(control: SentinelControlItem): void {
    this.canDeactivateTIEdit = true;
    this.canDeactivatePoolAssign = true;
    control.result$.pipe(take(1)).subscribe();
  }

  /**
   * Determines if all changes in sub components are saved and user can navigate to different component
   * @returns true if saved all his changes, false otherwise
   */
  canDeactivate(): boolean {
    return this.canDeactivateTIEdit && this.canDeactivateOrganizers && this.canDeactivatePoolAssign;
  }

  /**
   * Changes canDeactivate state of the component
   * @param hasUnsavedChanges true if organizers component has unsaved changes, false otherwise
   */
  onOrganizersChanged(hasUnsavedChanges: boolean): void {
    this.canDeactivateOrganizers = !hasUnsavedChanges;
  }

  /**
   * Changes canDeactivate state of the component
   * @param poolId pool ID of selected pool
   */
  onPoolSelectionChanged(poolId: number): void {
    this.canDeactivatePoolAssign = false;
    this.editService.poolSelectionChange(poolId);
  }

  /**
   * Updates state of the training instance and changes canDeactivate state of the component
   * @param $event training instance change event, containing latest update of training instance and its validity
   */
  onTrainingInstanceChanged($event: TrainingInstanceChangeEvent): void {
    this.editService.change($event);
    this.canDeactivateTIEdit = false;
  }
}
