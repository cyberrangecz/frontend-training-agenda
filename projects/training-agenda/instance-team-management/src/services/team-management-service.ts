import { Observable } from 'rxjs';
import { Team, TrainingInstanceLobby, TrainingUser } from '@crczp/training-model';

/**
 * Service for managing the queue and teams
 */
export abstract class TeamManagementService {
    abstract lobby$: Observable<TrainingInstanceLobby>;

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
    public abstract loadLobby(): Observable<void>;

    /**
     * Create a new team
     * @param name optional parameter for the team name
     * @param members optional parameter for the team members
     * @return Observable of the created team
     */
    public abstract createTeam(name?: string, members?: TrainingUser['id'][]): Observable<void>;

    /**
     * Change the team name
     * @param id team id
     * @param name new team name
     * @return Observable of the renamed team
     */
    public abstract renameTeam(id: Team['id'], name: string): Observable<void>;

    /**
     * Return players to the queue from prepared team and
     * delete the team
     * @param id team id
     * @return Observable of new queue state
     */
    public abstract disbandTeam(id: Team['id']): Observable<void>;

    /**
     * Assign players to a team
     * @param players player ids to assign
     * @param teamId team id to assign to
     * @return Observable of new queue state
     */
    public abstract assignToTeam(players: TrainingUser['id'][], teamId: Team['id']): Observable<void>;

    /**
     * Return players to the queue from prepared teams
     * @return Observable of new queue state
     * @param removalRecord
     */
    public abstract returnToQueue(
        removalRecord: { teamId: Team['id']; users: TrainingUser['id'][] }[],
    ): Observable<void>;

    /**
     * Assign players to teams automatically
     * @param players to assign
     * @return Observable of new queue state
     */
    public abstract autoAssign(players: TrainingUser['id'][]): Observable<void>;

    /**
     * Balance teams to maximum difference of 1 in team sizes
     * @return Observable of new prepared teams state
     */
    public abstract balanceTeams(): Observable<void>;

    /**
     * Move select players from one team to the other
     * @param teamFrom
     * @param teamTo
     * @param selectedTeamsUsers
     */
    public abstract moveBetweenTeams(
        teamFrom: Team['id'],
        teamTo: Team['id'],
        selectedTeamsUsers: TrainingUser['id'][],
    ): Observable<void>;

    /**
     * Check name validity, especially uniqueness
     * @param newName
     */
    public abstract isTeamNameValid(newName: string): boolean;

    /**
     * Lock team
     * Locked teams can join the training once the instance starts
     * @param id
     */
    public abstract lockTeam(id: number): Observable<void>;
}
