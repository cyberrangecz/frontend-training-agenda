import { TrainingNavigator } from './training-navigator.service';

import { Injectable } from '@angular/core';
import {
  ACCESS_TOKEN_PATH,
  PROGRESS_PATH,
  RESULTS_PATH,
  SANDBOX_POOL_PATH,
  SUMMARY_PATH,
  TRAINING_DEFINITION_EDIT_PATH,
  TRAINING_DEFINITION_NEW_PATH,
  TRAINING_DEFINITION_PATH,
  TRAINING_DEFINITION_PREVIEW_PATH,
  TRAINING_INSTANCE_DETAIL_PATH,
  TRAINING_INSTANCE_EDIT_PATH,
  TRAINING_INSTANCE_NEW_PATH,
  TRAINING_INSTANCE_PATH,
  TRAINING_RUN_ACCESS_PATH,
  TRAINING_RUN_PATH,
  TRAINING_RUN_RESULTS_PATH,
  TRAINING_RUN_RESUME_PATH,
} from '../../model/client/default-paths';

@Injectable()
export class TrainingDefaultNavigator extends TrainingNavigator {
  /**
   * Returns route to training definition overview page
   */
  toTrainingDefinitionOverview(): string {
    return TRAINING_DEFINITION_PATH;
  }

  /**
   * Returns route to training definition preview page
   * @param id id of the training definition
   */
  toTrainingDefinitionPreview(id: number | string): string {
    return `${TRAINING_DEFINITION_PATH}/${id}/${TRAINING_DEFINITION_PREVIEW_PATH}`;
  }

  /**
   * Returns route to training definition edit page
   * @param id id of the training definition
   */
  toTrainingDefinitionEdit(id: number | string): string {
    return `${TRAINING_DEFINITION_PATH}/${id}/${TRAINING_DEFINITION_EDIT_PATH}`;
  }
  /**
   * Returns route to new training definition page
   */
  toNewTrainingDefinition(): string {
    return `${TRAINING_DEFINITION_PATH}/${TRAINING_DEFINITION_NEW_PATH}`;
  }

  /**
   * Returns route to training instance overview page
   */
  toTrainingInstanceOverview(): string {
    return TRAINING_INSTANCE_PATH;
  }

  /**
   * Returns route to training instance edit page
   * @param id id of the training instance
   */
  toTrainingInstanceEdit(id: number | string): string {
    return `${TRAINING_INSTANCE_PATH}/${id}/${TRAINING_INSTANCE_EDIT_PATH}`;
  }

  /**
   * Returns route to training instance detail page
   * @param id id of the training instance
   */
  toTrainingInstanceDetail(id: number | string): string {
    return `${TRAINING_INSTANCE_PATH}/${id}/${TRAINING_INSTANCE_DETAIL_PATH}`;
  }

  /**
   * Returns route to training instance access token page
   * @param id id of the training instance
   */
  toTrainingInstanceAccessToken(id: number | string): string {
    return `${this.toTrainingInstanceDetail(id)}/${ACCESS_TOKEN_PATH}`;
  }

  /**
   * Returns route to training instance summary page
   * @param id id of the training instance
   */
  toTrainingInstanceSummary(id: number | string): string {
    return `${this.toTrainingInstanceDetail(id)}/${SUMMARY_PATH}`;
  }

  /**
   * Returns route to training instance progress page
   * @param id id of the training instance
   */
  toTrainingInstanceProgress(id: number | string): string {
    return `${this.toTrainingInstanceDetail(id)}/${PROGRESS_PATH}`;
  }

  /**
   * Returns route to training instance results page
   * @param id id of the training instance
   */
  toTrainingInstanceResults(id: number | string): string {
    return `${this.toTrainingInstanceDetail(id)}/${RESULTS_PATH}`;
  }

  /**
   * Returns route to new training instance page
   */
  toNewTrainingInstance(): string {
    return `${TRAINING_INSTANCE_PATH}/${TRAINING_INSTANCE_NEW_PATH}`;
  }

  toTrainingRunOverview(): string {
    return TRAINING_RUN_PATH;
  }

  /**
   * Returns route to training run game page
   * @param id id of the training run
   */
  toResumeTrainingRunGame(id: number | string): string {
    return `${TRAINING_RUN_PATH}/${TRAINING_RUN_RESUME_PATH}/${id}`;
  }

  toAccessTrainingRunGame(token: string): string {
    return `${TRAINING_RUN_PATH}/${TRAINING_RUN_ACCESS_PATH}/${token}`;
  }

  /**
   * Returns route to training run results page
   * @param id id of the training run
   */
  toTrainingRunResult(id: number | string): string {
    return `${TRAINING_RUN_PATH}/${TRAINING_RUN_RESULTS_PATH}/${id}`;
  }

  toPool(id: number | string): string {
    return `${SANDBOX_POOL_PATH}/${id}`;
  }
}
