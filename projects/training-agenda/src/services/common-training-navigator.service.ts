import { TrainingNavigator } from './training-navigator.service';

import { Injectable } from '@angular/core';
import {
    ACCESS_TOKEN_PATH,
    CHEATING_DETECTION_CREATE_PATH,
    CHEATING_DETECTION_EVENT_DETAIL_PATH,
    CHEATING_DETECTION_EVENTS_PATH,
    CHEATING_DETECTION_PATH,
    DEFINITION_NEW_PATH,
    LINEAR_RUN_PATH,
    MITRE_TECHNIQUES_PATH,
    PROGRESS_PATH,
    RESULTS_PATH,
    RUNS_PATH,
    SANDBOX_POOL_PATH,
    SUMMARY_PATH,
    TRAINING_DEFINITION_DETAIL_PATH,
    TRAINING_DEFINITION_EDIT_PATH,
    TRAINING_DEFINITION_PREVIEW_PATH,
    TRAINING_INSTANCE_DETAIL_PATH,
    TRAINING_INSTANCE_EDIT_PATH,
    TRAINING_INSTANCE_NEW_PATH,
    TRAINING_RUN_ACCESS_PATH,
    TRAINING_RUN_RESULTS_AGGREGATED_DASHBOARD_PATH,
    TRAINING_RUN_RESULTS_PATH,
    TRAINING_RUN_RESUME_PATH,
} from '../model/default-paths';

@Injectable()
export abstract class CommonTrainingNavigator extends TrainingNavigator {
    protected constructor(
        private trainingDefinitionBasePath: string,
        private trainingInstanceBasePath: string,
        private runBasePath: string,
    ) {
        super();
    }

    /**
     * Returns route to training definition overview page
     */
    toTrainingDefinitionOverview(): string {
        return this.trainingDefinitionBasePath;
    }

    /**
     * Returns route to mitre techniques
     */
    toMitreTechniques(): string {
        return `${MITRE_TECHNIQUES_PATH}`;
    }

    /**
     * Returns route to training run mitre techniques
     */
    toTrainingRunMitreTechniques(): string {
        return `${LINEAR_RUN_PATH}/${MITRE_TECHNIQUES_PATH}`;
    }

    /**
     * Returns route to training definition preview page
     * @param id id of the training definition
     */
    toTrainingDefinitionPreview(id: number | string): string {
        return `${this.trainingDefinitionBasePath}/${id}/${TRAINING_DEFINITION_PREVIEW_PATH}`;
    }

    /**
     * Returns route to training definition edit page
     * @param id id of the training definition
     */
    toTrainingDefinitionEdit(id: number | string): string {
        return `${this.trainingDefinitionBasePath}/${id}/${TRAINING_DEFINITION_EDIT_PATH}`;
    }

    /**
     * Returns route to new training definition page
     */
    toNewTrainingDefinition(): string {
        return `${this.trainingDefinitionBasePath}/${DEFINITION_NEW_PATH}`;
    }

    /**
     * Returns route to training definition detail page
     * @param id id of the training definition
     */
    toTrainingDefinitionDetail(id: number): string {
        return `${this.trainingDefinitionBasePath}/${id}/${TRAINING_DEFINITION_DETAIL_PATH}`;
    }

    /**
     * Returns route to training instance overview page
     */
    toTrainingInstanceOverview(): string {
        return this.trainingInstanceBasePath;
    }

    /**
     * Returns route to training instance edit page
     * @param id id of the training instance
     */
    toTrainingInstanceEdit(id: number | string): string {
        return `${this.trainingInstanceBasePath}/${id}/${TRAINING_INSTANCE_EDIT_PATH}`;
    }

    /**
     * Returns route to training instance detail page
     * @param id id of the training instance
     */
    toTrainingInstanceDetail(id: number | string): string {
        return `${this.trainingInstanceBasePath}/${id}/${TRAINING_INSTANCE_DETAIL_PATH}`;
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
     * Returns route to training instance aggregated results page
     * @param id id of the training instance
     */
    toTrainingInstanceAggregatedResults(id: number | string): string {
        return `${this.toTrainingInstanceDetail(id)}/${RESULTS_PATH}/${TRAINING_RUN_RESULTS_AGGREGATED_DASHBOARD_PATH}`;
    }

    toTrainingInstanceCheatingDetection(id: number | string): string {
        return `${this.toTrainingInstanceDetail(id)}/${CHEATING_DETECTION_PATH}`;
    }

    toTrainingInstanceCheatingDetectionCreate(id: number | string): string {
        return `${this.toTrainingInstanceDetail(id)}/${CHEATING_DETECTION_PATH}/${CHEATING_DETECTION_CREATE_PATH}`;
    }

    toTrainingInstanceCheatingDetectionEvents(tid: number | string, cid: number | string): string {
        return `${this.toTrainingInstanceDetail(tid)}/${CHEATING_DETECTION_PATH}/${cid}/${CHEATING_DETECTION_EVENTS_PATH}`;
    }

    toTrainingInstanceCheatingDetectionEventDetail(
        tid: number | string,
        cid: number | string,
        eventId: number,
    ): string {
        return `${this.toTrainingInstanceDetail(
            tid,
        )}/${CHEATING_DETECTION_PATH}/${cid}/${CHEATING_DETECTION_EVENTS_PATH}/${eventId}/${CHEATING_DETECTION_EVENT_DETAIL_PATH}`;
    }

    /**
     * Returns route to training instance runs page
     * @param id id of the training instance
     */
    toTrainingInstanceRuns(id: number | string): string {
        return `${this.toTrainingInstanceDetail(id)}/${RUNS_PATH}`;
    }

    /**
     * Returns route to new training instance page
     */
    toNewTrainingInstance(): string {
        return `${this.trainingInstanceBasePath}/${TRAINING_INSTANCE_NEW_PATH}`;
    }

    toTrainingRunOverview(): string {
        return LINEAR_RUN_PATH;
    }

    /**
     * Returns route to training run training page
     * @param id id of the training run
     */
    toResumeTrainingRun(id: number | string): string {
        return `${this.runBasePath}/${TRAINING_RUN_RESUME_PATH}/${id}`;
    }

    toAccessTrainingRun(token: string): string {
        return `${this.runBasePath}/${TRAINING_RUN_ACCESS_PATH}/${token}`;
    }

    /**
     * Returns route to training run results page
     * @param id id of the training run
     */
    toTrainingRunResult(id: number | string): string {
        return `${this.runBasePath}/${TRAINING_RUN_RESULTS_PATH}/${id}`;
    }

    toPool(id: number | string): string {
        return `${SANDBOX_POOL_PATH}/${id}`;
    }
}
