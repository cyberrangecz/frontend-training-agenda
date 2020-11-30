import { Injectable } from '@angular/core';
import { TrainingAgendaConfig } from '@kypo/training-agenda';

@Injectable()
export class TrainingAgendaContext {
  private readonly _config: TrainingAgendaConfig;

  get config(): TrainingAgendaConfig {
    return this._config;
  }

  constructor(config: TrainingAgendaConfig) {
    this._config = config;
  }
}
