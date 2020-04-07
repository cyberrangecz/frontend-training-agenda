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
   * Returns route to new training instance page
   */
  abstract toNewTrainingInstance(): string;

  /**
   * Returns route to training runs overview page
   */
  abstract toTrainingRunOverview(): string;

  /**
   * Returns route to training run game page
   * @param id id of the training run
   */
  abstract toResumeTrainingRunGame(id: number | string): string;

  /**
   * Returns route to training training run game
   * @param token access token to the game
   */
  abstract toAccessTrainingRunGame(token: string): string;

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

