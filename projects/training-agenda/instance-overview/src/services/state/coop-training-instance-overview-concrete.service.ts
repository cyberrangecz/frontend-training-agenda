import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PoolApi } from '@crczp/sandbox-api';
import { TrainingInstanceApi, TrainingInstanceLobbyApi } from '@crczp/training-api';
import { Observable, of } from 'rxjs';
import { CoopTrainingNavigator, TrainingErrorHandler, TrainingNotificationService } from '@crczp/training-agenda';
import { TrainingAgendaContext } from '@crczp/training-agenda/internal';
import { TrainingInstanceOverviewService } from './training-instance-overview.service';
import { MatDialog } from '@angular/material/dialog';
import { TrainingInstance, TrainingTypeEnum } from '@crczp/training-model';
import { OffsetPaginationEvent, PaginatedResource } from '@sentinel/common/pagination';
import { CommonTrainingInstanceOverviewConcreteService } from './common-training-instance-overview-concrete.service';

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
    extends CommonTrainingInstanceOverviewConcreteService
    implements CoopTrainingInstanceOverviewService
{
    constructor(
        trainingInstanceApi: TrainingInstanceApi,
        dialog: MatDialog,
        poolApi: PoolApi,
        private lobbyApi: TrainingInstanceLobbyApi,
        router: Router,
        protected navigator: CoopTrainingNavigator,
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
            TrainingTypeEnum.COOP,
        );
    }

    public teamsManagement(instanceId: number): Observable<any> {
        return of(this.router.navigate([this.navigator.toTeamsManagement(instanceId)]));
    }

    public playersWaiting$(lo): Observable<{ [p: TrainingInstance['id']]: number }> {
        return this.lobbyApi.getInstanceLobby();
    }
}
