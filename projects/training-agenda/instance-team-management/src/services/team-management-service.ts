import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Team, TrainingUser, TeamsQueue } from '@crczp/training-model';
import { take } from 'rxjs/operators';

/**
 * Service for managing the queue and teams
 */
export abstract class TeamManagementService {
    /**
     * Behaviour subject of the players waiting in the queue
     * Values are updated by the service automatically
     */
    public waitingPlayersSubject: BehaviorSubject<TrainingUser[]> = new BehaviorSubject([]);

    /**
     * Behaviour subject of the not yet started teams
     * Values are updated by the service automatically
     */
    public preparedTeamsSubject: BehaviorSubject<Team[]> = new BehaviorSubject([]);

    /**
     * Behaviour subject of the started teams
     * Values are updated by the service automatically
     */
    public startedTeamsSubject: BehaviorSubject<Team[]> = new BehaviorSubject([]);

    /**
     * Behaviour subject of the maximum team size
     * Values are updated by the service automatically
     */
    public maxTeamSizeSubject: BehaviorSubject<number> = new BehaviorSubject(1);

    /**
     * Pull the latest state of data
     */
    public init() {
        this.getAllStartedTeams().pipe(take(1)).subscribe();
        this.getQueue().pipe(take(1)).subscribe();
        this.getMaxTeamSize().pipe(take(1)).subscribe();
    }

    /**
     * Fetch all started teams
     * @return Observable of all started teams
     */
    public abstract getAllStartedTeams(): Observable<Team[]>;

    /**
     * Fetch the queue of players waiting to be assigned to teams
     * and prepared teams
     * @return Observable of the queue
     */
    public abstract getQueue(): Observable<TeamsQueue>;

    /**
     * Create a new team
     * @param name optional parameter for the team name
     * @param members optional parameter for the team members
     * @return Observable of the created team
     */
    public abstract createTeam(name?: string, members?: TrainingUser['id'][]): Observable<TeamsQueue>;

    /**
     * Assign players to teams automatically
     * @param players to assign
     * @return Observable of new queue state
     */
    public abstract autoAssign(players: TrainingUser['id'][]): Observable<TeamsQueue>;

    /**
     * Assign players to a team
     * @param players player ids to assign
     * @param teamId team id to assign to
     * @return Observable of new queue state
     */
    public abstract assignToTeam(players: TrainingUser['id'][], teamId: Team['id']): Observable<TeamsQueue>;

    /**
     * Balance teams
     * @return Observable of new prepared teams state
     */
    public abstract balanceTeams(): Observable<Team[]>;

    /**
     * Return players to the queue from prepared teams
     * @param players player ids to return
     * @return Observable of new queue state
     */
    public abstract returnToQueue(players: TrainingUser['id'][]): Observable<TeamsQueue>;

    /**
     * Change the team name
     * @param id team id
     * @param name new team name
     * @return Observable of the renamed team
     */
    public abstract renameTeam(id: Team['id'], name: string): Observable<Team>;

    /**
     * Return players to the queue from prepared team
     * @param id team id
     * @return Observable of new queue state
     */
    public abstract disbandTeam(id: Team['id']): Observable<TeamsQueue>;

    /**
     * Fetch maximum team size
     * @return Observable of the maximum team size
     */
    public abstract getMaxTeamSize(): Observable<number>;
}
