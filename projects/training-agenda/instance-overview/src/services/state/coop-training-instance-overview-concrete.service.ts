import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PoolApi } from '@crczp/sandbox-api';
import { TrainingInstanceApi, TrainingInstanceLobbyApi } from '@crczp/training-api';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CoopTrainingNavigator, TrainingErrorHandler, TrainingNotificationService } from '@crczp/training-agenda';
import { TrainingAgendaContext } from '@crczp/training-agenda/internal';
import { TrainingInstanceOverviewService } from './training-instance-overview.service';
import { MatDialog } from '@angular/material/dialog';
import { TrainingInstance, TrainingTypeEnum } from '@crczp/training-model';
import { CommonTrainingInstanceOverviewConcreteService } from './common-training-instance-overview-concrete.service';
import { take } from 'rxjs/operators';

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
    public abstract playersWaiting(token: TrainingInstance['id']): number;
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
        this.resource$.subscribe((instances) => {
            instances.elements.forEach((element) => {
                if (this.playersWaitingSubject.value[element.id] === undefined) {
                    this.lobbyApi
                        .getPlayersWaiting(element.accessToken)
                        .pipe(take(1))
                        .subscribe((value) => (this.playersWaitingSubject.value[element.id] = value));
                }
            });
        });
    }

    private playersWaitingSubject: BehaviorSubject<{ [key: number]: number }> = new BehaviorSubject({});

    public teamsManagement(instanceId: number): Observable<any> {
        return of(this.router.navigate([this.navigator.toTeamsManagement(instanceId)]));
    }

    public playersWaiting(instanceId: number): number {
        return this.playersWaitingSubject.value[instanceId];
    }
}
