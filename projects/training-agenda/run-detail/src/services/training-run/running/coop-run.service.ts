import { Observable } from 'rxjs';
import { LimitedScoreboard, Team, TeamMessage } from '@crczp/training-model';

export abstract class CoopRunService {
    /**
     * Retrieves team information from training run
     */
    abstract fetchTeamInfo(): Observable<Team>;

    /**
     * Retrieves scoreboard showing position of user's team in the training instance
     */
    abstract fetchScoreboard(): Observable<LimitedScoreboard>;

    /**
     * Retrieves messages of the team
     * The fetches are incremental, returning only new data on each fetch
     * @param teamId user's team
     */
    abstract fetchMessages(teamId: number): Observable<TeamMessage[]>;
}
