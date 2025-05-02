import { CoopTrainingRunService } from './coop-training-run.service';
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import { LimitedScoreboard, Team, TeamMessage, TrainingLevel } from '@crczp/training-model';
import { CoopTrainingRunApi } from '@crczp/training-api';
import { Injectable } from '@angular/core';
import { catchError, map, take, tap } from 'rxjs/operators';
import { SentinelAuthService } from '@sentinel/auth';
import { RunningTrainingRunService } from './running-training-run.service';
import { Router } from '@angular/router';
import { CoopTrainingNavigator } from '@crczp/training-agenda';

@Injectable()
export class CoopTrainingRunConcreteService implements CoopTrainingRunService {
    constructor(
        protected api: CoopTrainingRunApi,
        protected authService: SentinelAuthService,
        protected runningService: RunningTrainingRunService,
        protected router: Router,
        protected navigator: CoopTrainingNavigator,
    ) {}

    teamInfoSubject = new BehaviorSubject<Team>(null);
    messagesSubject = new BehaviorSubject<Record<number, TeamMessage>>({});
    scoreboardSubject = new BehaviorSubject<LimitedScoreboard>(null);

    public cachedTeams: Record<number, Team> = {};

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

    fetchTeamInfo(): Observable<void> {
        return this.api.getTeam(this.runningService.trainingRunId).pipe(
            tap((team) => this.teamInfoSubject.next(team)),
            map(() => void 0),
        );
    }

    private isFullTeam(team: Team): boolean {
        return Array.isArray(team.members) && team.members.length > 0;
    }

    fetchScoreboard(): Observable<void> {
        return this.api
            .getLocalizedScoreboard(
                this.runningService.trainingRunId,
                Object.keys(this.cachedTeams).map((id) => +id),
            )
            .pipe(
                map((scoreboard) => {
                    const entries = scoreboard.scoreboard.map((entry) => {
                        const teamId = entry.team.id;
                        const isCached = teamId in this.cachedTeams;
                        const team = isCached ? this.cachedTeams[teamId] : entry.team;
                        if (!isCached || this.isFullTeam(entry.team)) {
                            this.cachedTeams[teamId] = entry.team;
                        }
                        return {
                            ...entry,
                            team,
                        };
                    });

                    const updatedScoreboard: LimitedScoreboard = {
                        ...scoreboard,
                        scoreboard: entries,
                    };

                    return updatedScoreboard;
                }),
                tap((scoreboard) => {
                    this.scoreboardSubject.next(scoreboard);
                }),
                map(() => void 0),
            );
    }

    fetchMessages(teamId: number): Observable<void> {
        return this.api.getTeamMessages(teamId, this.lastFetch).pipe(
            tap((messages) => {
                const currentMessages = this.messagesSubject.value;
                messages.forEach((message) => {
                    currentMessages[message.id] = message;
                });
                this.messagesSubject.next(currentMessages);
            }),
            map(() => void 0),
        );
    }

    sendMessage(message: string, teamId: number): Observable<void> {
        return this.api.postTeamMessage(teamId, <number>this.authService.getActiveUser().id, message).pipe(
            tap((message: TeamMessage) => {
                const updated = this.messagesSubject.value;
                updated[message.id] = message;
                this.messagesSubject.next(updated);
            }),
            map(() => void 0),
        );
    }

    refetchRun(): Observable<void> {
        const level = this.runningService.getActiveLevel();
        return this.api
            .loadIfChanged(
                this.runningService.trainingRunId,
                level?.id,
                level instanceof TrainingLevel
                    ? level.hints.filter((hint) => hint.isRevealed()).map((hint) => hint.id)
                    : [],
                level instanceof TrainingLevel ? level.hasSolution() : false,
            )
            .pipe(
                take(1),
                catchError((err) => {
                    console.error('Error', err);
                    if (err.status === 410) {
                        this.router.navigate([this.navigator.toTrainingRunResult(this.runningService.trainingRunId)]);
                        return EMPTY;
                    }
                    if (err.status === 304) {
                        return EMPTY;
                    }
                    return throwError(() => err);
                }),
                tap((trainingRunInfo) => this.runningService.init(trainingRunInfo)),
                map(() => void 0),
            );
    }
}
