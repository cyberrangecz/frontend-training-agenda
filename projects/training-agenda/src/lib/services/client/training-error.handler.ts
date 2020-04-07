import {HttpErrorResponse} from '@angular/common/http';

/**
 * Handles errors emitted from training agenda services and components. Should be overridden by client
 */
export abstract class TrainingErrorHandler {

  /**
   * Handles error and displays it in user friendly way
   * @param err http error
   * @param operation description of an operation which caused the error
   */
  abstract emit(err: HttpErrorResponse, operation: string);
}
