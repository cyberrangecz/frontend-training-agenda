import { CoopTrainingRunService } from './coop-training-run.service';
import { BehaviorSubject, of } from 'rxjs';
import { LimitedScoreboard, Team, TeamMessage } from '@crczp/training-model';
import { CoopTrainingRunApi } from '@crczp/training-api';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, take, tap } from 'rxjs/operators';
import { SentinelAuthService } from '@sentinel/auth';
import { RunningTrainingRunService } from './running-training-run.service';

@Injectable()
export class CoopTrainingRunConcreteService implements CoopTrainingRunService {
    constructor(
        protected api: CoopTrainingRunApi,
        protected authService: SentinelAuthService,
        protected runningService: RunningTrainingRunService,
    ) {}

    teamInfoSubject = new BehaviorSubject<Team>(null);
    messagesSubject = new BehaviorSubject<TeamMessage[]>([]);
    scoreboardSubject = new BehaviorSubject<LimitedScoreboard>(null);

    public teams$ = this.teamInfoSubject.asObservable().pipe(tap(() => console.log('executed teams')));
    public messages$ = this.messagesSubject.asObservable().pipe(tap(() => console.log('executed messages$')));
    public scoreboard$ = this.scoreboardSubject.asObservable().pipe(tap(() => console.log('executed scoreboard$')));

    private lastFetch = new Date(1970);

    // ensure no duplicates caused by clock desync
    private seenMessageIds = new Set<number>();

    getScoreboard(): LimitedScoreboard | null {
        return this.scoreboardSubject.value;
    }

    getTeam(): Team | null {
        return this.teamInfoSubject.value;
    }

    getMessages(): TeamMessage[] {
        return this.messagesSubject.value;
    }

    fetchTeamInfo(): void {
        this.api.getTeam(this.runningService.trainingRunId).subscribe((team) => this.teamInfoSubject.next(team));
    }

    fetchScoreboard(): void {
        this.api
            .getLocalizedScoreboard(this.runningService.trainingRunId)
            .subscribe((scoreboard) => this.scoreboardSubject.next(scoreboard));
    }

    fetchMessages(teamId: number): void {
        this.api
            .getTeamMessages(teamId, this.lastFetch)
            .pipe(map((messages: TeamMessage[]) => this.handleNewMessages(messages)))
            .subscribe((messages) => this.messagesSubject.next(this.messagesSubject.value.concat(messages)));
    }

    sendMessage(message: string, teamId: number): void {
        this.api
            .postTeamMessage(teamId, <number>this.authService.getActiveUser().id, message)
            .subscribe((message: TeamMessage) => {
                this.seenMessageIds.add(message.id);
                this.messagesSubject.next(this.messagesSubject.value.concat(message));
            });
    }

    private handleNewMessages(messages: TeamMessage[]): TeamMessage[] {
        const filtered = messages.filter((message) => !this.seenMessageIds.has(message.id));
        filtered.forEach((message) => this.seenMessageIds.add(message.id));
        const sorted = filtered.sort((a, b) => a.time.getTime() - b.time.getTime());
        if (sorted.length > 0 && typeof sorted[sorted.length - 1].time?.getTime() === 'number') {
            this.lastFetch.setTime(sorted[sorted.length - 1].time.getTime());
        }
        return sorted;
    }

    refetchRun(): void {
        this.api
            .resume(this.runningService.trainingRunId)
            .pipe(
                take(1),
                tap((trainingRunInfo) => console.log(trainingRunInfo)),
            )
            .subscribe((trainingRunInfo) => this.runningService.init(trainingRunInfo));
    }
}
