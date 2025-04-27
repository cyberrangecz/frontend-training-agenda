import { CoopRunService } from './coop-run.service';
import { Observable } from 'rxjs';
import { LimitedScoreboard, Team, TeamMessage } from '@crczp/training-model';
import { RunningTrainingRunService } from '@crczp/training-agenda/run-detail';
import { CoopTrainingRunApi } from '@crczp/training-api';
import { inject, Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class CoopRunConcreteService extends CoopRunService {
    protected runningService = inject(RunningTrainingRunService);
    protected runApi = inject(CoopTrainingRunApi);

    private lastFetch = new Date(1970);

    // ensure no duplicates caused by clock desync
    private seenMessageIds = new Set<number>();

    fetchTeamInfo(): Observable<Team> {
        return this.runApi.getTeam(this.runningService.trainingRunId);
    }

    fetchScoreboard(): Observable<LimitedScoreboard> {
        return this.runApi.getLocalizedScoreboard(this.runningService.trainingRunId);
    }

    fetchMessages(teamId: number): Observable<TeamMessage[]> {
        return this.runApi.getTeamMessages(teamId, this.lastFetch).pipe(
            map((messages: TeamMessage[]) => messages.filter((message) => !this.seenMessageIds.has(message.id))),
            tap((messages: TeamMessage[]) => messages.forEach((message) => this.seenMessageIds.add(message.id))),
            tap(() => (this.lastFetch = new Date())),
        );
    }
}
