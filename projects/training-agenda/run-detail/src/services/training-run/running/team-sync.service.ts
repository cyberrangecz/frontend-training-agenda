import { Injectable } from '@angular/core';
import { TrainingInstanceLobbyApi } from '@crczp/training-api';
import { Observable } from 'rxjs';

@Injectable()
export abstract class TeamSyncService {
    protected constructor(protected lobbyApi: TrainingInstanceLobbyApi) {}

    abstract fetchTeamInfo(): Observable<TeamInfo>;
}
