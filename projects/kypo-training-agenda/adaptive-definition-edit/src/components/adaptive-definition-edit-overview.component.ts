import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { SentinelControlItem } from '@sentinel/components/controls';
import { MitreTechnique, Phase, TrainingDefinition } from '@muni-kypo-crp/training-model';
import { combineLatest, Observable } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { TrainingDefinitionEditControls } from '../model/adapters/training-definition-edit-controls';
import { TrainingDefinitionChangeEvent } from '../model/events/training-definition-change-event';
import { PaginationService } from '@muni-kypo-crp/training-agenda/internal';
import { AdaptiveDefinitionEditService } from '../services/state/edit/adaptive-definition-edit.service';
import { ADAPTIVE_DEFINITION_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';
import { AdaptiveDefinitionEditConcreteService } from '../services/state/edit/adaptive-definition-edit-concrete.service';
import { SentinelUserAssignService } from '@sentinel/components/user-assign';
import { AuthorsAssignService } from '../services/state/authors-assign/authors-assign.service';
import { PhaseEditService } from '../services/state/phase/phase-edit.service';
import { PhaseEditConcreteService } from '../services/state/phase/phase-edit-concrete.service';
import { MitreTechniquesService } from '../services/state/mitre-techniques/mitre-techniques.service';
import { MitreTechniquesConcreteService } from '../services/state/mitre-techniques/mitre-techniques-concrete.service';

/**
 * Main smart component of training definition edit/new page.
 */
@Component({
  selector: 'kypo-adaptive-definition-detail',
  templateUrl: './adaptive-definition-edit-overview.component.html',
  styleUrls: ['./adaptive-definition-edit-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: AdaptiveDefinitionEditService, useClass: AdaptiveDefinitionEditConcreteService },
    { provide: PhaseEditService, useClass: PhaseEditConcreteService },
    { provide: SentinelUserAssignService, useClass: AuthorsAssignService },
    { provide: MitreTechniquesService, useClass: MitreTechniquesConcreteService },
  ],
})
export class AdaptiveDefinitionEditOverviewComponent extends SentinelBaseDirective {
  trainingDefinition$: Observable<TrainingDefinition>;
  editMode$: Observable<boolean>;
  tdTitle$: Observable<string>;
  phasesCount = -1;
  definitionSaveDisabled$: Observable<boolean>;
  phasesSaveDisabled$: Observable<boolean>;
  unsavedPhases: Phase[] = [];
  canDeactivateAuthors = true;
  canDeactivateTDEdit = true;
  defaultPaginationSize: number;
  controls: SentinelControlItem[];
  mitreTechniques$: Observable<MitreTechnique[]>;

  constructor(
    private activeRoute: ActivatedRoute,
    private paginationService: PaginationService,
    private editService: AdaptiveDefinitionEditService,
    private phaseEditService: PhaseEditService,
    private mitreTechniquesService: MitreTechniquesService
  ) {
    super();
    this.defaultPaginationSize = this.paginationService.getPagination();
    this.trainingDefinition$ = this.editService.trainingDefinition$;
    this.tdTitle$ = this.editService.trainingDefinition$.pipe(map((td) => td.title));
    this.definitionSaveDisabled$ = this.editService.saveDisabled$;
    this.phasesSaveDisabled$ = this.phaseEditService.saveDisabled$;
    this.mitreTechniques$ = this.mitreTechniquesService.mitreTechniques$;
    this.mitreTechniquesService
      .getAll()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe();
    const valid$: Observable<boolean> = combineLatest(
      this.editService.definitionValid$,
      this.phaseEditService.phasesValid$
    ).pipe(map((valid) => valid[0] && valid[1]));
    this.activeRoute.data
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((data) => this.editService.set(data[ADAPTIVE_DEFINITION_DATA_ATTRIBUTE_NAME]));
    this.editMode$ = this.editService.editMode$.pipe(
      tap(
        () =>
          (this.controls = TrainingDefinitionEditControls.create(
            this.editService,
            this.definitionSaveDisabled$,
            this.phasesSaveDisabled$,
            valid$
          ))
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
