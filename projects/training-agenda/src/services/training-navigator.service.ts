/**
 * Creates routes to navigate between components and pages of training agenda. Default implementation is provived,
 * but can be overridden by client if custom routes are desired
 */
export abstract class TrainingNavigator {
    /**
     * Returns route to training definition overview page
     */
    abstract toTrainingDefinitionOverview(): string;

    /**
     * Returns route to mitre techniques
     */
    abstract toMitreTechniques(): string;

    /**
     * Returns route to training run mitre techniques
     */
    abstract toTrainingRunMitreTechniques(): string;

    /**
     * Returns route to training definition preview page
     * @param id id of the training definition
     */
    abstract toTrainingDefinitionPreview(id: number | string): string;

    /**
     * Returns route to training definition edit page
     * @param id id of the training definition
     */
    abstract toTrainingDefinitionEdit(id: number | string): string;

    /**
     * Returns route to new training definition page
     */
    abstract toNewTrainingDefinition(): string;

    /**
     * Returns route to training definition detail page
     * @param id id of the training definition
     */
    abstract toTrainingDefinitionDetail(id: number): string;

    /**
     * Returns route to training instance overview page
     */
    abstract toTrainingInstanceOverview(): string;

    /**
     * Returns route to training instance edit page
     * @param id id of the training instance
     */
    abstract toTrainingInstanceEdit(id: number | string): string;

    /**
     * Returns route to training instance detail page
     * @param id id of the training instance
     */
    abstract toTrainingInstanceDetail(id: number | string): string;

    /**
     * Returns route to training instance access token page
     * @param id id of the training instance
     */
    abstract toTrainingInstanceAccessToken(id: number | string): string;

    /**
     * Returns route to training instance summary page
     * @param id id of the training instance
     */
    abstract toTrainingInstanceSummary(id: number | string): string;

    /**
     * Returns route to training instance progress page
     * @param id id of the training instance
     */
    abstract toTrainingInstanceProgress(id: number | string): string;

    /**
     * Returns route to training instance results page
     * @param id id of the training instance
     */
    abstract toTrainingInstanceResults(id: number | string): string;

    /**
     * Returns route to training instance aggregated results page
     * @param id id of the training instance
     */
    abstract toTrainingInstanceAggregatedResults(id: number | string): string;

    /**
     * Returns route to training instance cheating detection page
     * @param id of the training instance
     */
    abstract toTrainingInstanceCheatingDetection(id: number | string): string;

    /**
     * Returns route to training instance cheating detection create page
     * @param id of the training instance
     */
    abstract toTrainingInstanceCheatingDetectionCreate(id: number | string): string;

    /**
     * Returns route to training instance cheating detection events page
     * @param tid of the training instance
     * @param cid the cheating detection id
     */
    abstract toTrainingInstanceCheatingDetectionEvents(tid: number | string, cid: number | string): string;

    /**
     * Returns route to training instance cheating detection event detail page
     * @param tid of the training instance
     * @param cid the cheating detection id
     * @param eventId of the detection event
     */
    abstract toTrainingInstanceCheatingDetectionEventDetail(
        tid: number | string,
        cid: number | string,
        eventId: number,
    ): string;

    /**
     * Returns route to training instance runs page
     * @param id id of the training instance
     */
    abstract toTrainingInstanceRuns(id: number | string): string;

    /**
     * Returns route to new training instance page
     */
    abstract toNewTrainingInstance(): string;

    /**
     * Returns route to training runs overview page
     */
    abstract toTrainingRunOverview(): string;

    /**
     * Returns route to training run training page
     * @param id id of the training run
     */
    abstract toResumeTrainingRun(id: number | string): string;

    /**
     * Returns route to training run training
     * @param token access token to the training
     */
    abstract toAccessTrainingRun(token: string): string;

    /**
     * Returns route to training run results page
     * @param id id of the training run
     */
    abstract toTrainingRunResult(id: number | string): string;

    /**
     * Returns route to pool detail
     * @param poolId id of pool to navigate to
     */
    abstract toPool(poolId: number | string): string;
}
