import { OffsetPaginationEvent, PaginatedResource, OffsetPaginatedElementsService } from '@sentinel/common';
import { TrainingDefinitionStateEnum } from '@muni-kypo-crp/training-model';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';

/**
 * A layer between a component and an API service. Implement a concrete service by extending this class.
 * Provide a concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * You can use get methods to get paginated resources and other operations to modify data.
 * Subscribe to trainingDefinitions$ to receive latest data updates.
 */
export abstract class AdaptiveDefinitionService extends OffsetPaginatedElementsService<TrainingDefinition> {
  abstract create(): Observable<any>;

  abstract edit(trainingDefinition: TrainingDefinition): Observable<any>;

  abstract preview(trainingDefinition: TrainingDefinition): Observable<any>;

  abstract toAdaptivePreview(trainingDefinition: TrainingDefinition): Observable<boolean>;

  abstract showMitreTechniques(): Observable<any>;

  /**
   *
   * @param pagination requested pagination
   * @param filter filter to be applied on training definition
   */
  abstract getAll(pagination: OffsetPaginationEvent, filter: string): Observable<PaginatedResource<TrainingDefinition>>;

  /**
   * Deletes selected training definition
   * @param trainingDefinition definition to delete
   */
  abstract delete(trainingDefinition: TrainingDefinition): Observable<any>;

  /**
   * Creates a clone of selected training definition
   * @param trainingDefinition training definition to clone
   */
  abstract clone(trainingDefinition: TrainingDefinition): Observable<any>;

  /**
   * Downloads training definition description in JSON
   * @param trainingDefinition training definition to download
   */
  abstract download(trainingDefinition: TrainingDefinition): Observable<any>;

  /**
   * Creates new training definition by uploading its JSON description.
   */
  abstract upload(): Observable<any>;

  /**
   * Changes state of a training definition
   * @param trainingDefinition training definition whose state shall be changed
   * @param newState new state of a training definition
   */
  abstract changeState(trainingDefinition: TrainingDefinition, newState: TrainingDefinitionStateEnum): Observable<any>;
}
