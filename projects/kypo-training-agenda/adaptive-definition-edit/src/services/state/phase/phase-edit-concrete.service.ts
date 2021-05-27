import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  SentinelConfirmationDialogComponent,
  SentinelConfirmationDialogConfig,
  SentinelDialogResultEnum,
} from '@sentinel/components/dialogs';
import { EMPTY, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { PhaseEditService } from './phase-edit.service';
import { AdaptiveDefinitionApiService } from '@muni-kypo-crp/training-api';
import {
  AbstractPhaseTypeEnum,
  InfoPhase,
  Phase,
  QuestionnairePhase,
  QuestionnaireTypeEnum,
  Task,
  TrainingPhase,
} from '@muni-kypo-crp/training-model';
import { TrainingErrorHandler, TrainingNotificationService } from '@muni-kypo-crp/training-agenda';

@Injectable()
export class PhaseEditConcreteService extends PhaseEditService {
  constructor(
    private api: AdaptiveDefinitionApiService,
    private dialog: MatDialog,
    private errorHandler: TrainingErrorHandler,
    private notificationService: TrainingNotificationService
  ) {
    super();
  }

  set(trainingDefinitionId: number, phases: Phase[]): void {
    this.trainingDefinitionId = trainingDefinitionId;
    this.phasesSubject$.next(phases);
    this.updatePresentTrainingPhases();
    this.updateActiveTasks();
  }

  getPhasesCount(): number {
    return this.phasesSubject$.getValue().length;
  }

  setActivePhase(phaseIndex: number): void {
    this.activeStepSubject$.next(phaseIndex);
    if (this.phasesSubject$.value.length > 0 && this.getSelected().type === AbstractPhaseTypeEnum.Training) {
      this.activeTaskStepSubject$.next(0);
      this.updateActiveTasks();
    }
    this.setPhaseCanBeSaved(this.getSelected());
  }

  /**
   * Performs necessary actions to initiate and update values related to active phases change
   * @param phase new active phases
   */
  onActivePhaseChanged(phase: Phase): void {
    phase.isUnsaved = true;
    const newPhases = this.phasesSubject$.getValue();
    newPhases[this.activeStepSubject$.getValue()] = phase;
    this.phasesSubject$.next(newPhases);
    this.setPhaseCanBeSaved(phase);
    this.emitUnsavedPhases();
  }

  onActiveTaskChanged(task: Task): void {
    task.isUnsaved = true;
    this.getSelected().isUnsaved = true;
    const newPhases = this.phasesSubject$.getValue();
    (newPhases[this.activeStepSubject$.getValue()] as TrainingPhase).tasks[task.order] = task;
    this.phasesSubject$.next(newPhases);
    this.updateActiveTasks();
    this.setPhaseCanBeSaved(this.getSelected());
    this.emitUnsavedPhases();
  }

  /**
   * Determines whether passed phases can be saved. Optionally, if value is passed as an argument,
   * it uses value of the argument.
   * @param phase phases to determine
   * @param value pre-determined result
   */
  setPhaseCanBeSaved(phase: Phase, value?: boolean): void {
    if (this.phasesSubject$.getValue().length > 0 && phase.id === this.getSelected().id) {
      if (value !== undefined) {
        this.activePhaseCanBeSavedSubject$.next(value);
      } else {
        this.activePhaseCanBeSavedSubject$.next(phase.valid && phase.isUnsaved);
      }
    }
  }

  getSelected(): Phase {
    return this.phasesSubject$.getValue()[this.activeStepSubject$.getValue()];
  }

  getSelectedTask(): Task {
    return this.activeTasksSubject$.getValue()[this.activeTaskStepSubject$.getValue()];
  }

  navigateToLastPhase(): void {
    this.setActivePhase(this.phasesSubject$.getValue().length - 1);
  }

  navigateToPreviousPhase(): void {
    const curr = this.activeStepSubject$.getValue();
    if (curr > 0) {
      this.setActivePhase(curr - 1);
    } else {
      this.setActivePhase(0);
    }
  }

  navigateToPreviousTask(): void {
    const curr = this.activeTaskStepSubject$.getValue();
    if (curr > 0) {
      this.setActiveTask(curr - 1);
    } else {
      this.setActiveTask(0);
    }
  }

  add(phaseType: AbstractPhaseTypeEnum, questionnaireType?: QuestionnaireTypeEnum): Observable<Phase> {
    let added$: Observable<Phase>;
    switch (phaseType) {
      case AbstractPhaseTypeEnum.Info: {
        added$ = this.addInfoPhase();
        break;
      }
      case AbstractPhaseTypeEnum.Training: {
        added$ = this.addTrainingPhase();
        break;
      }
      case AbstractPhaseTypeEnum.Questionnaire: {
        added$ = this.addQuestionnairePhase(questionnaireType);
        break;
      }
      default:
        console.error('Unsupported type of phases in add method od PhaseEditService');
    }
    return added$.pipe(tap(() => this.navigateToLastPhase()));
  }

  /**
   * Saves changes in edited phases and optionally informs on result of the operation
   */
  saveSelected(): Observable<any> {
    this.phasesSubject$.next(Array.from(this.phasesSubject$.value));
    const phase = this.getSelected();
    this.setPhaseCanBeSaved(phase, false);
    return this.sendRequestToSavePhase(phase).pipe(
      tap(
        () => {
          this.onPhaseSaved(phase);
          this.notificationService.emit('success', `Phase ${phase.title} saved`);
        },
        (err) => {
          this.setPhaseCanBeSaved(phase);
          this.errorHandler.emit(err, `Saving phase ${phase.title}`);
        }
      )
    );
  }

  deleteSelected(): Observable<any> {
    const phase = this.getSelected();
    return this.displayDialogToDeletePhase(phase).pipe(
      switchMap((result) => (result === SentinelDialogResultEnum.CONFIRMED ? this.callApiToDelete(phase) : EMPTY))
    );
  }

  deleteTask(): Observable<any> {
    const task = this.getSelectedTask();
    return this.displayDialogToDeleteTask(task).pipe(
      switchMap((result) => (result === SentinelDialogResultEnum.CONFIRMED ? this.callApiToDeleteTask(task.id) : EMPTY))
    );
  }

  move(fromIndex: number, toIndex: number): void {
    const phases = this.phasesSubject$.getValue();
    const from = phases[fromIndex];
    if (from.type === AbstractPhaseTypeEnum.Training) {
      this.displayDialogToMoveTrainingPhase(from)
        .pipe(
          switchMap((result) => {
            if (result === SentinelDialogResultEnum.CONFIRMED) {
              return this.callApiToMove(fromIndex, toIndex, from.id);
            } else {
              this.moveRollback(fromIndex);
            }
          })
        )
        .subscribe();
    } else {
      this.callApiToMove(fromIndex, toIndex, from.id).subscribe();
    }
  }

  private callApiToMove(fromIndex: number, toIndex: number, phaseId: number): Observable<any> {
    this.moveInternally(fromIndex, toIndex);
    return this.api.movePhaseTo(this.trainingDefinitionId, phaseId, toIndex).pipe(
      tap(() => {
        this.updateOrder();
        this.updateMatrices();
        this.updateActiveTasks();
        this.updatePresentTrainingPhases();
      })
    );
  }

  moveTasks(fromIndex: number, toIndex: number): void {
    const phaseId = this.getSelected().id;
    const tasks = (this.phasesSubject$.getValue()[this.activeStepSubject$.getValue()] as TrainingPhase).tasks;
    const from = tasks[fromIndex];
    this.moveTasksInternally(fromIndex, toIndex);
    this.api
      .moveTaskTo(this.trainingDefinitionId, phaseId, from.id, toIndex)
      .pipe(
        tap(() => {
          this.updateActiveTasks();
        })
      )
      .subscribe();
  }

  private moveRollback(fromIndex: number): void {
    const phases = this.phasesSubject$.getValue();
    this.phasesSubject$.next(phases.sort((a, b) => a.order - b.order));
    this.setActivePhase(fromIndex);
  }

  private addInfoPhase(): Observable<InfoPhase> {
    return this.api.createInfoPhase(this.trainingDefinitionId).pipe(
      tap(
        (phase) => this.onPhaseAdded(phase),
        (err) => this.errorHandler.emit(err, 'Adding info phase')
      )
    );
  }

  private addTrainingPhase(): Observable<TrainingPhase> {
    return this.api.createTrainingPhase(this.trainingDefinitionId).pipe(
      tap(
        (phase) => {
          this.onPhaseAdded(phase);
          this.presentTrainingPhasesSubject$.next([...this.presentTrainingPhasesSubject$.getValue(), phase]);
        },
        (err) => this.errorHandler.emit(err, 'Adding training phase')
      )
    );
  }

  addTask(): Observable<Task> {
    const phaseId = this.getSelected().id;
    return this.api.createTask(this.trainingDefinitionId, phaseId).pipe(
      tap(
        (task) => this.onTaskAdded(task),
        (err) => this.errorHandler.emit(err, 'Adding task')
      )
    );
  }

  cloneTask(): Observable<Task> {
    const phaseId = this.getSelected().id;
    const clonedTask = this.getSelectedTask();
    return this.api.cloneTask(this.trainingDefinitionId, phaseId, clonedTask).pipe(
      tap(
        (task) => this.onTaskAdded(task),
        (err) => this.errorHandler.emit(err, 'Cloning task')
      )
    );
  }

  private addQuestionnairePhase(questionnaireType: QuestionnaireTypeEnum): Observable<QuestionnairePhase> {
    switch (questionnaireType) {
      case QuestionnaireTypeEnum.Adaptive: {
        return this.api.createAdaptiveQuestionnairePhase(this.trainingDefinitionId).pipe(
          tap(
            (phase) => {
              this.onPhaseAdded(phase);
            },
            (err) => this.errorHandler.emit(err, 'Adding adaptive questionnaire phase')
          )
        );
      }
      case QuestionnaireTypeEnum.General: {
        return this.api.createGeneralQuestionnairePhase(this.trainingDefinitionId).pipe(
          tap(
            (phase) => {
              this.onPhaseAdded(phase);
            },
            (err) => this.errorHandler.emit(err, 'Adding general questionnaire phase')
          )
        );
      }
    }
  }

  onTaskAdded(task: Task): void {
    (this.phasesSubject$.getValue()[this.activeStepSubject$.getValue()] as TrainingPhase).tasks.push(task);
    this.updateActiveTasks();
  }

  private displayDialogToDeletePhase(phase: Phase): Observable<SentinelDialogResultEnum> {
    let matrixWarn = '';
    if (phase.type === AbstractPhaseTypeEnum.Training) {
      matrixWarn = ' This might affect data in subsequent decision matrices.';
    }
    const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
      data: new SentinelConfirmationDialogConfig(
        'Delete Phase',
        `Do you want to delete phase "${phase.title}"?` + matrixWarn,
        'Cancel',
        'Delete'
      ),
    });
    return dialogRef.afterClosed();
  }

  private displayDialogToMoveTrainingPhase(phase: Phase): Observable<SentinelDialogResultEnum> {
    const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
      data: new SentinelConfirmationDialogConfig(
        'Move Training Phase',
        `Do you want to move phase "${phase.title}"? This might affect data in subsequent decision matrices.`,
        'Cancel',
        'Move'
      ),
    });
    return dialogRef.afterClosed();
  }

  private displayDialogToDeleteTask(task: Task): Observable<SentinelDialogResultEnum> {
    const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
      data: new SentinelConfirmationDialogConfig(
        'Delete Task',
        `Do you want to delete task "${task.title}"?`,
        'Cancel',
        'Delete'
      ),
    });
    return dialogRef.afterClosed();
  }

  private callApiToDelete(phase: Phase): Observable<any> {
    return this.api.deletePhase(this.trainingDefinitionId, phase.id).pipe(
      tap(
        () => {
          this.onPhaseDeleted(phase.id);
        },
        (err) => this.errorHandler.emit(err, `Deleting phase ${phase.title}`)
      )
    );
  }

  private updateMatrices(): void {
    const phases = this.phasesSubject$.getValue();
    phases.forEach((phase) => {
      if (phase.type === AbstractPhaseTypeEnum.Training) {
        this.api.getPhase(this.trainingDefinitionId, phase.id).subscribe((val) => {
          (phase as TrainingPhase).decisionMatrix = (val as TrainingPhase).decisionMatrix;
          this.phasesSubject$.next(phases);
          this.updateMatrixSubject$.next(!this.updateMatrixSubject$.getValue());
        });
      }
    });
  }

  private callApiToDeleteTask(taskId: number): Observable<any> {
    const phaseId = this.getSelected().id;
    return this.api.deleteTask(this.trainingDefinitionId, phaseId, taskId).pipe(
      tap(
        () => {
          this.onTaskDeleted(taskId);
        },
        (err) => (err) => this.errorHandler.emit(err, 'Deleting task')
      )
    );
  }

  private onTaskDeleted(id: number): void {
    (this.phasesSubject$.getValue()[
      this.activeStepSubject$.getValue()
    ] as TrainingPhase).tasks = (this.phasesSubject$.getValue()[
      this.activeStepSubject$.getValue()
    ] as TrainingPhase).tasks.filter((task) => task.id !== id);
    this.navigateToPreviousTask();
    this.updateActiveTasks();
  }

  private onPhaseDeleted(deletedId: number): void {
    if (this.getSelected().type === AbstractPhaseTypeEnum.Training) {
      this.presentTrainingPhasesSubject$.next(
        this.presentTrainingPhasesSubject$.getValue().filter((trainingPhase) => trainingPhase.id !== deletedId)
      );
      this.updateRelations(deletedId);
    }
    this.phasesSubject$.next(this.phasesSubject$.getValue().filter((phase) => phase.id !== deletedId));
    this.updateMatrices();
    this.navigateToPreviousPhase();
  }

  private updateRelations(deletedId: number) {
    const updated = this.phasesSubject$.value;
    updated.forEach((phase) => {
      if (phase.type === AbstractPhaseTypeEnum.Questionnaire) {
        (phase as QuestionnairePhase).phaseRelations = (phase as QuestionnairePhase).phaseRelations.filter(
          (relation) => relation.phaseId !== deletedId
        );
      }
    });
    this.phasesSubject$.next(updated);
  }

  private onPhaseAdded(phase: Phase): void {
    this.phasesSubject$.next([...this.phasesSubject$.getValue(), phase]);
  }

  private sendRequestToSavePhase(phase: Phase): Observable<any> {
    switch (true) {
      case phase instanceof InfoPhase:
        return this.saveInfoPhase(phase as InfoPhase);

      case phase instanceof TrainingPhase:
        if ((phase as TrainingPhase).tasks.length !== 0) {
          (phase as TrainingPhase).tasks.forEach((task) => {
            this.saveTask(task).subscribe();
            this.onPhaseSaved(task);
          });
        }
        return this.saveTrainingPhase(phase as TrainingPhase);

      case phase instanceof QuestionnairePhase:
        return this.saveQuestionnairePhase(phase as QuestionnairePhase);
      default:
        console.error('Unsupported instance of phases in save method od PhaseEditService');
    }
  }

  private saveTask(phase: Task): Observable<any> {
    const phaseId = this.getSelected().id;
    return this.api.updateTask(this.trainingDefinitionId, phaseId, phase);
  }

  private saveInfoPhase(phase: InfoPhase): Observable<any> {
    return this.api.updateInfoPhase(this.trainingDefinitionId, phase);
  }

  private saveTrainingPhase(phase: TrainingPhase): Observable<any> {
    return this.api.updateTrainingPhase(this.trainingDefinitionId, phase);
  }

  private saveQuestionnairePhase(phase: QuestionnairePhase): Observable<any> {
    return this.api.updateQuestionnairePhase(this.trainingDefinitionId, phase).pipe(
      map((response) => {
        this.updateQuestionnaireData(response);
      })
    );
  }

  private updateQuestionnaireData(questionnaire: QuestionnairePhase) {
    const phases = this.phasesSubject$.value;
    phases[this.activeStepSubject$.value] = questionnaire;
    this.phasesSubject$.next(phases);
  }

  private onPhaseSaved(phase: Phase): void {
    phase.isUnsaved = false;
    phase.valid = true;
    this.setPhaseCanBeSaved(phase);
    this.emitUnsavedPhases();
  }

  private emitUnsavedPhases(): void {
    this.unsavedPhasesSubject$.next(this.phasesSubject$.getValue().filter((phase) => phase.isUnsaved));
  }

  private moveInternally(fromIndex: number, toIndex: number): void {
    const phases = this.phasesSubject$.getValue();
    phases.splice(toIndex, 0, phases.splice(fromIndex, 1)[0]);
    this.phasesSubject$.next(phases);
  }

  private updateOrder(): void {
    const phases = this.phasesSubject$.getValue();
    phases.forEach((phase, index) => (phase.order = index));
  }

  private moveTasksInternally(fromIndex: number, toIndex: number): void {
    const tasks = (this.phasesSubject$.getValue()[this.activeStepSubject$.getValue()] as TrainingPhase).tasks;
    tasks.splice(toIndex, 0, tasks.splice(fromIndex, 1)[0]);
    tasks.forEach((phase, index) => (phase.order = index));
    (this.phasesSubject$.getValue()[this.activeStepSubject$.getValue()] as TrainingPhase).tasks = tasks;
  }

  private updateActiveTasks(): void {
    this.activeTasksSubject$.next((this.getSelected() as TrainingPhase).tasks);
  }

  private updatePresentTrainingPhases(): void {
    this.presentTrainingPhasesSubject$.next(
      this.phasesSubject$.value.filter((phase) => phase.type === AbstractPhaseTypeEnum.Training) as TrainingPhase[]
    );
  }

  setActiveTask(index: number): void {
    this.activeTaskStepSubject$.next(index);
  }
}
