import { Observable } from 'rxjs';
import { LimitedScoreboard, Team, TeamMessage } from '@crczp/training-model';

export abstract class CoopTrainingRunService {
    abstract teams$: Observable<Team>;
    abstract messages$: Observable<TeamMessage[]>;
    abstract scoreboard$: Observable<LimitedScoreboard>;

    abstract getScoreboard(): LimitedScoreboard | null;
    abstract getMessages(): TeamMessage[];
    abstract getTeam(): Team | null;

    /**
     * Retrieves team information from training run
     */
    abstract fetchTeamInfo(): void;

    /**
     * Retrieves scoreboard showing position of user's team in the training instance
     */
    abstract fetchScoreboard(): void;

    /**
     * Retrieves messages of the team
     * The fetches are incremental, returning only new data on each fetch
     * @param teamId user's team
     */
    abstract fetchMessages(teamId: number): void;

    /**
     * Sends a new message in the team chat
     * @param message
     * @param teamId
     */
    abstract sendMessage(message: string, teamId: number): void;

    /**
     * Updates the training run information in the RunningTrainingRunService
     */
    abstract refetchRun(): void;
}
