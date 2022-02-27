import { PaginatedResource, OffsetPaginationEvent, SentinelBaseDirective } from '@sentinel/common';
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
import { Pool, SandboxDefinition } from '@muni-kypo-crp/sandbox-model';
import { SandboxPoolListAdapter } from '../models/adapter/sandbox-pool-list-adapter';

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
  readonly PAGE_SIZE: number = 999;

  trainingInstance$: Observable<TrainingInstance>;
  pools$: Observable<SandboxPoolListAdapter[]>;
  selectedPoolId: Observable<number>;
  sandboxDefinitions$: Observable<SandboxDefinition[]>;
  selectedSandboxDefinitionId: Observable<number>;
  hasStarted$: Observable<boolean>;
  editMode$: Observable<boolean>;
  tiTitle$: Observable<string>;
  instanceValid$: Observable<boolean>;
  canDeactivateOrganizers = true;
  canDeactivatePoolAssign = true;
  canDeactivateSandboxDefinitionAssign = true;
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
        tap((assignedPool) => (this.hasAssignedPool = assignedPool ? true : false))
      )
      .subscribe();
    const saveDisabled$: Observable<boolean> = combineLatest(
      this.editService.saveDisabled$,
      this.editService.poolSaveDisabled$,
      this.editService.poolSaveDisabled$,
      this.editService.sandboxDefinitionSaveDisabled$
    ).pipe(map((valid) => valid[0] && valid[1] && valid[2]));
    this.tiTitle$ = this.editService.trainingInstance$.pipe(map((ti) => ti.title));
    this.activeRoute.data
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((data) => this.editService.set(data[ADAPTIVE_INSTANCE_DATA_ATTRIBUTE_NAME]));
    this.pools$ = this.editService.pools$.pipe(map((pool) => this.mapToAdapter(pool)));
    this.sandboxDefinitions$ = this.editService.sandboxDefinitions$.pipe(map((definitions) => definitions.elements));
    this.refreshPools();
    this.refreshSandboxDefinitions();
    this.selectedPoolId = this.editService.assignedPool$;
    this.selectedSandboxDefinitionId = this.editService.assignedSandboxDefinition$;
    this.controls = AdaptiveInstanceEditControls.create(this.editService, saveDisabled$, this.instanceValid$);
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
    this.canDeactivateSandboxDefinitionAssign = true;
    control.result$.pipe(take(1)).subscribe();
  }

  /**
   * Determines if all changes in sub components are saved and user can navigate to different component
   * @returns true if saved all his changes, false otherwise
   */
  canDeactivate(): boolean {
    return (
      this.canDeactivateTIEdit &&
      this.canDeactivateOrganizers &&
      this.canDeactivatePoolAssign &&
      this.canDeactivateSandboxDefinitionAssign
    );
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
   * Changes canDeactivate state of the component
   * @param sandboxDefinitionId ID of selected sandbox definition
   */
  onSandboxDefinitionSelectionChanged(sandboxDefinitionId: number): void {
    this.canDeactivateSandboxDefinitionAssign = false;
    this.editService.sandboxDefinitionSelectionChange(sandboxDefinitionId);
  }

  /**
   * Updates state of the training instance and changes canDeactivate state of the component
   * @param $event training instance change event, containing latest update of training instance and its validity
   */
  onTrainingInstanceChanged($event: AdaptiveInstanceChangeEvent): void {
    this.editService.change($event);
    this.canDeactivateTIEdit = false;
  }

  private refreshPools() {
    const pagination = new OffsetPaginationEvent(0, this.PAGE_SIZE, '', '');
    this.editService.getAllPools(pagination).pipe(take(1)).subscribe();
  }

  private refreshSandboxDefinitions() {
    const pagination = new OffsetPaginationEvent(0, this.PAGE_SIZE, '', '');
    this.editService.getAllSandboxDefinitions(pagination).pipe(take(1)).subscribe();
  }

  private mapToAdapter(resource: PaginatedResource<Pool>): SandboxPoolListAdapter[] {
    return resource.elements.map((pool) => {
      const adapter = pool as SandboxPoolListAdapter;
      adapter.title = !adapter.isLocked() ? `Pool ${adapter.id}` : `Pool ${adapter.id} (locked)`;
      return adapter;
    });
  }
}
