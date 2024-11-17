import { Component } from '@angular/core';

import EventStateTypeEnum = BasicEventInfo.EventStateTypeEnum;
import { TrainingErrorHandler, TrainingNotificationService } from '@muni-kypo-crp/training-agenda';
import { BasicEventInfo, SimulatorState } from '@muni-kypo-crp/adaptive-model-simulator/instance-model-simulator';

@Component({
  selector: 'kypo-adaptive-definition-simulator',
  templateUrl: './adaptive-definition-simulator.component.html',
  styleUrls: ['./adaptive-definition-simulator.component.css'],
})
export class AdaptiveDefinitionSimulatorComponent {
  constructor(
    private errorHandler: TrainingErrorHandler,
    private notificationService: TrainingNotificationService,
  ) {}

  handleState(event: SimulatorState) {
    if (event && event.state === EventStateTypeEnum.ERROR_EVENT) {
      this.errorHandler.emit(event?.error, event.message);
    } else if (event) {
      this.notificationService.emit('success', event.message);
    }
  }
}
