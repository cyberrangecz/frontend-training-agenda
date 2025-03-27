import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PoolApi } from '@crczp/sandbox-api';
import { TrainingInstanceApi } from '@crczp/training-api';
import { Observable, of } from 'rxjs';
import { TrainingErrorHandler, TrainingNotificationService } from '@crczp/training-agenda';
import { TrainingAgendaContext } from '@crczp/training-agenda/internal';
import { TrainingInstanceOverviewService } from './training-instance-overview.service';
import { MatDialog } from '@angular/material/dialog';
import { LinearTrainingInstanceOverviewConcreteService } from './linear-training-instance-overview-concrete.service';
import { CoopTrainingNavigator } from '@crczp/training-agenda';
import { TrainingInstance } from '@crczp/training-model';

export abstract class CoopTrainingInstanceOverviewService extends TrainingInstanceOverviewService {
    /**
     * Redirect to the teams management page
     * @param instanceId
     */
    public abstract teamsManagement(instanceId: TrainingInstance['id']): Observable<any>;

    /**
     * Pull data about number of players waiting for instances
     * @return
     */
    public abstract playersWaiting(): Observable<{ [key: TrainingInstance['id']]: number }>;
}

@Injectable()
export class CoopTrainingInstanceOverviewConcreteService
    extends LinearTrainingInstanceOverviewConcreteService
    implements CoopTrainingInstanceOverviewService
{
    constructor(
        trainingInstanceApi: TrainingInstanceApi,
        dialog: MatDialog,
        poolApi: PoolApi,
        router: Router,
        protected navigator: CoopTrainingNavigator,
        context: TrainingAgendaContext,
        notificationService: TrainingNotificationService,
        errorHandler: TrainingErrorHandler,
    ) {
        super(trainingInstanceApi, dialog, poolApi, router, navigator, context, notificationService, errorHandler);
    }

    public teamsManagement(instanceId: number): Observable<any> {
        return of(this.router.navigate([this.navigator.toTeamsManagement(instanceId)]));
    }

    public playersWaiting(): Observable<{ [p: TrainingInstance['id']]: number }> {
        return of(); //todo
    }
}
