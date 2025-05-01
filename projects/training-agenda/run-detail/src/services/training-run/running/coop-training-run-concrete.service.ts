import { CoopTrainingRunService } from './coop-training-run.service';
import { BehaviorSubject } from 'rxjs';
import { LimitedScoreboard, Team, TeamMessage } from '@crczp/training-model';
import { CoopTrainingRunApi } from '@crczp/training-api';
import { Injectable } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
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
    messagesSubject = new BehaviorSubject<Record<number, TeamMessage>>({});
    scoreboardSubject = new BehaviorSubject<LimitedScoreboard>(null);

    public teams$ = this.teamInfoSubject.asObservable();
    public messages$ = this.messagesSubject.asObservable().pipe(
        map((messages) => Object.values(messages).sort((a, b) => a.time.getTime() - b.time.getTime())),
        tap((sortedMessages) => {
            if (sortedMessages.length > 0) {
                this.lastFetch = sortedMessages[sortedMessages.length - 1].time;
            }
        }),
    );
    private lastFetch = new Date(1970);

    public scoreboard$ = this.scoreboardSubject.asObservable();

    getScoreboard(): LimitedScoreboard | null {
        return this.scoreboardSubject.value;
    }

    getTeam(): Team | null {
        return this.teamInfoSubject.value;
    }

    getMessages(): TeamMessage[] {
        return Object.values(this.messagesSubject.value);
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
        this.api.getTeamMessages(teamId, this.lastFetch).subscribe((messages) => {
            const currentMessages = this.messagesSubject.value;
            messages.forEach((message) => {
                currentMessages[message.id] = message;
            });
            this.messagesSubject.next(currentMessages);
        });
    }

    sendMessage(message: string, teamId: number): void {
        this.api
            .postTeamMessage(teamId, <number>this.authService.getActiveUser().id, message)
            .subscribe((message: TeamMessage) => {
                const updated = this.messagesSubject.value;
                updated[message.id] = message;
                this.messagesSubject.next(updated);
            });
    }

    refetchRun(): void {
        this.api
            .resume(this.runningService.trainingRunId)
            .pipe(take(1))
            .subscribe((trainingRunInfo) => this.runningService.init(trainingRunInfo));
    }
}
