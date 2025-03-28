import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PoolApi } from '@crczp/sandbox-api';
import { TrainingInstanceApi } from '@crczp/training-api';
import { TrainingTypeEnum } from '@crczp/training-model';
import { TrainingErrorHandler, TrainingNavigator, TrainingNotificationService } from '@crczp/training-agenda';
import { TrainingAgendaContext } from '@crczp/training-agenda/internal';
import { MatDialog } from '@angular/material/dialog';
import { CommonTrainingInstanceOverviewConcreteService } from './common-training-instance-overview-concrete.service';

@Injectable()
export class LinearTrainingInstanceOverviewConcreteService extends CommonTrainingInstanceOverviewConcreteService {
    constructor(
        trainingInstanceApi: TrainingInstanceApi,
        dialog: MatDialog,
        poolApi: PoolApi,
        router: Router,
        navigator: TrainingNavigator,
        context: TrainingAgendaContext,
        notificationService: TrainingNotificationService,
        errorHandler: TrainingErrorHandler,
    ) {
        super(
            trainingInstanceApi,
            dialog,
            poolApi,
            router,
            navigator,
            context,
            notificationService,
            errorHandler,
            TrainingTypeEnum.LINEAR,
        );
    }
}
