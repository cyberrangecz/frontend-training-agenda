import { Observable } from 'rxjs';
import { Team, TrainingInstanceLobby, TrainingUser } from '@crczp/training-model';

/**
 * Service for managing the queue and teams
 */
export abstract class TeamManagementService {
    abstract lobby$: Observable<TrainingInstanceLobby>;

    abstract getLobbySnapshot(): TrainingInstanceLobby;

    abstract loadingData$: Observable<boolean>;

    /**
     * Parameters inputted by the using component
     *
     * @param instanceId
     * @param maxTeamSize
     */
    public abstract init(instanceId: number, maxTeamSize: number): void;

    /**
     * Fetch all started teams
     * @return Observable of all started teams
     */
    public abstract loadLobby(): void;

    /**
     * Create a new team
     * @param name optional parameter for the team name
     * @param members optional parameter for the team members
     * @return Observable of the created team
     */
    public abstract createTeam(name?: string, members?: TrainingUser['id'][]): void;

    /**
     * Change the team name
     * @param id team id
     * @param name new team name
     * @return Observable of the renamed team
     */
    public abstract renameTeam(id: Team['id'], name: string): void;

    /**
     * Return players to the queue from prepared team and
     * delete the team
     * @param id team id
     * @return Observable of new queue state
     */
    public abstract disbandTeam(id: Team['id']): void;

    /**
     * Assign players to a team
     * @param players player ids to assign
     * @param teamId team id to assign to
     * @return Observable of new queue state
     */
    public abstract assignToTeam(players: TrainingUser['id'][], teamId: Team['id']): void;

    /**
     * Return players to the queue from prepared teams
     * @param players player ids to return
     * @return Observable of new queue state
     */
    public abstract returnToQueue(players: TrainingUser['id'][]): void;

    /**
     * Assign players to teams automatically
     * @param players to assign
     * @return Observable of new queue state
     */
    public abstract autoAssign(players: TrainingUser['id'][]): void;

    /**
     * Balance teams
     * @return Observable of new prepared teams state
     */
    public abstract balanceTeams(): void;
}
