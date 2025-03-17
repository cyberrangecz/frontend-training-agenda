import { Team, TeamsQueue, TrainingUser } from '@crczp/training-model';
import { Observable } from 'rxjs';
import { TeamManagementService } from './team-management-service';

export class TeamManagementConcreteService extends TeamManagementService {
    constructor(teamsApi: TeamsApi) {
        super();
    }

    public getAllStartedTeams(): Observable<Team[]> {}

    public getQueue(): Observable<TeamsQueue> {
        throw new Error('Method not implemented.');
    }

    public createTeam(name?: string, members?: TrainingUser['id'][]): Observable<TeamsQueue> {
        throw new Error('Method not implemented.');
    }

    public autoAssign(players: TrainingUser['id'][]): Observable<TeamsQueue> {
        throw new Error('Method not implemented.');
    }

    public assignToTeam(players: TrainingUser['id'][], teamId: Team['id']): Observable<TeamsQueue> {
        throw new Error('Method not implemented.');
    }

    public balanceTeams(): Observable<Team[]> {
        throw new Error('Method not implemented.');
    }

    public returnToQueue(players: TrainingUser['id'][]): Observable<TeamsQueue> {
        throw new Error('Method not implemented.');
    }

    public renameTeam(id: Team['id'], name: string): Observable<Team> {
        throw new Error('Method not implemented.');
    }

    public disbandTeam(id: Team['id']): Observable<TeamsQueue> {
        throw new Error('Method not implemented.');
    }

    public getMaxTeamSize(): Observable<number> {
        throw new Error('Method not implemented.');
    }
}
