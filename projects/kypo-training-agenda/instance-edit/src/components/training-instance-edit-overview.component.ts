import { ChangeDetectionStrategy, Component, DestroyRef, HostListener, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OffsetPaginationEvent, PaginatedResource } from '@sentinel/common/pagination';
import { SentinelControlItem } from '@sentinel/components/controls';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { Observable, switchMap } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { TrainingInstanceEditControls } from '../model/adapter/training-instance-edit-controls';
import { TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';
import { TrainingInstanceChangeEvent } from '../model/events/training-instance-change-event';
import { PaginationService } from '@muni-kypo-crp/training-agenda/internal';
import { TrainingInstanceEditService } from '../services/state/edit/training-instance-edit.service';
import { TrainingInstanceEditConcreteService } from '../services/state/edit/training-instance-edit-concrete.service';
import { OrganizersAssignService } from '../services/state/organizers-assign/organizers-assign.service';
import { SandboxPoolListAdapter } from '../model/adapter/sandbox-pool-list-adapter';
import { Pool, SandboxDefinition } from '@muni-kypo-crp/sandbox-model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SentinelUserAssignService } from '@sentinel/components/user-assign';

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
export class TrainingInstanceEditOverviewComponent implements OnInit {
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
  destroyRef = inject(DestroyRef);

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private paginationService: PaginationService,
    private editService: TrainingInstanceEditService,
    private organizersAssignService: SentinelUserAssignService,
  ) {
    this.defaultPaginationSize = this.paginationService.DEFAULT_PAGINATION;
    this.trainingInstance$ = this.editService.trainingInstance$;
    this.hasStarted$ = this.editService.hasStarted$;
    this.instanceValid$ = this.editService.instanceValid$;
    const saveDisabled$: Observable<boolean> = this.editService.saveDisabled$;
    this.editMode$ = this.editService.editMode$;
    this.tiTitle$ = this.editService.trainingInstance$.pipe(map((ti) => ti.title));
    this.activeRoute.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => this.editService.set(data[TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]));
    this.pools$ = this.editService.pools$.pipe(map((pool) => this.mapToAdapter(pool)));
    this.sandboxDefinitions$ = this.editService.sandboxDefinitions$.pipe(map((definitions) => definitions.elements));
    this.refreshPools();
    this.refreshSandboxDefinitions();
    this.controls = TrainingInstanceEditControls.create(this.editService, saveDisabled$, this.instanceValid$);
  }

  ngOnInit(): void {
    this.editMode$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((editMode) => editMode),
        switchMap(() => this.editService.trainingInstance$),
        takeUntilDestroyed(this.destroyRef),
        filter((trainingInstance) => !!trainingInstance && !!trainingInstance.id),
      )
      .subscribe((trainingInstance) =>
        this.organizersAssignService
          .getAssigned(trainingInstance.id, new OffsetPaginationEvent(0, this.defaultPaginationSize))
          .subscribe(),
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
  onTrainingInstanceChanged($event: TrainingInstanceChangeEvent): void {
    this.editService.change($event);
    this.canDeactivateTIEdit = false;
  }

  private refreshPools() {
    const pagination = new OffsetPaginationEvent(0, this.PAGE_SIZE, '', 'asc');
    this.editService.getAllPools(pagination).pipe(take(1)).subscribe();
  }

  private refreshSandboxDefinitions() {
    const pagination = new OffsetPaginationEvent(0, this.PAGE_SIZE, '', 'asc');
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
