import { SentinelBaseDirective } from '@sentinel/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { SentinelControlItem } from '@sentinel/components/controls';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take, takeWhile, tap } from 'rxjs/operators';
import { AdaptiveInstanceEditService } from '../services/state/edit/adaptive-instance-edit.service';
import { PaginationService } from '@muni-kypo-crp/training-agenda/internal';
import { AdaptiveInstanceEditControls } from '../models/adapter/adaptive-instance-edit-controls';
import { ADAPTIVE_INSTANCE_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';
import { AdaptiveInstanceChangeEvent } from '../models/events/adaptive-instance-change-event';
import { AdaptiveInstanceEditConcreteService } from '../services/state/edit/adaptive-instance-edit-concrete.service';
import { SentinelUserAssignService } from '@sentinel/components/user-assign';
import { OrganizersAssignService } from '../services/state/organizers-assign/organizers-assign.service';

@Component({
  selector: 'kypo-adaptive-instance-edit-overview',
  templateUrl: './adaptive-instance-edit-overview.component.html',
  styleUrls: ['./adaptive-instance-edit-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: AdaptiveInstanceEditService, useClass: AdaptiveInstanceEditConcreteService },
    { provide: SentinelUserAssignService, useClass: OrganizersAssignService },
  ],
})
export class AdaptiveInstanceEditOverviewComponent extends SentinelBaseDirective {
  trainingInstance$: Observable<TrainingInstance>;
  hasStarted$: Observable<boolean>;
  editMode$: Observable<boolean>;
  tiTitle$: Observable<string>;
  instanceValid$: Observable<boolean>;
  canDeactivateOrganizers = true;
  canDeactivatePoolAssign = true;
  canDeactivateTIEdit = true;
  defaultPaginationSize: number;
  hasAssignedPool: boolean;
  controls: SentinelControlItem[];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private paginationService: PaginationService,
    private editService: AdaptiveInstanceEditService
  ) {
    super();
    this.defaultPaginationSize = this.paginationService.getPagination();
    this.trainingInstance$ = this.editService.trainingInstance$;
    this.hasStarted$ = this.editService.hasStarted$;
    this.instanceValid$ = this.editService.instanceValid$;
    this.editMode$ = this.editService.editMode$;
    this.editService.assignedPool$
      .pipe(
        takeWhile(() => this.isAlive),
        tap((assignedPool) => this.hasAssignedPool = assignedPool ? true : false))
      .subscribe();
    const saveDisabled$: Observable<boolean> = combineLatest(
      this.editService.saveDisabled$,
      this.editService.poolSaveDisabled$
    ).pipe(map((valid) => valid[0] && valid[1]));
    this.tiTitle$ = this.editService.trainingInstance$.pipe(map((ti) => ti.title));
    this.activeRoute.data
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((data) => this.editService.set(data[ADAPTIVE_INSTANCE_DATA_ATTRIBUTE_NAME]));
    this.controls = AdaptiveInstanceEditControls.create(
      this.editService,
      saveDisabled$,
      this.instanceValid$
    );
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
  onTrainingInstanceChanged($event: AdaptiveInstanceChangeEvent): void {
    this.editService.change($event);
    this.canDeactivateTIEdit = false;
  }
}
