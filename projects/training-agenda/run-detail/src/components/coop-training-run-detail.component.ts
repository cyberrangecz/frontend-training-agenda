import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { EMPTY, exhaustMap, merge, timer } from 'rxjs';
import { CoopTrainingRunService } from '../services/training-run/running/coop-training-run.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SentinelAuthService } from '@sentinel/auth';
import { catchError, filter, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { TrainingAgendaConfig } from '@crczp/training-agenda';

@Component({
    selector: 'crczp-coop-training-run-detail',
    templateUrl: './coop-training-run-detail.component.html',
    styleUrls: ['./coop-training-run-detail.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Main component of trainees training. Displays window with current level of a training and navigation to the next.
 * Optionally displays stepper with progress of the training and timer counting time from the start of a training.
 */
export class CoopTrainingRunDetailComponent implements OnInit {
    currentUser$ = this.auth.activeUser$;

    private readonly destroyRef = inject(DestroyRef);

    private lastMessageCount = 0;

    filteredMessages$ = this.service.messages$.pipe(
        filter((messages) => Object.keys(messages).length > this.lastMessageCount),
        tap((messages) => (this.lastMessageCount = Object.keys(messages).length)),
    );

    constructor(
        protected service: CoopTrainingRunService,
        protected route: ActivatedRoute,
        private auth: SentinelAuthService,
        private config: TrainingAgendaConfig,
    ) {}

    ngOnInit() {
        timer(0, this.config.coopTrainingLongPollingPeriod)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                exhaustMap(() =>
                    this.service.fetchTeamInfo().pipe(
                        catchError((err) => {
                            console.error('Polling team info error:', err);
                            return EMPTY;
                        }),
                    ),
                ),
            )
            .subscribe();
        timer(this.config.coopTrainingShortPollingPeriod, this.config.coopTrainingShortPollingPeriod)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                exhaustMap(() =>
                    this.service.fetchScoreboard().pipe(
                        catchError((err) => {
                            console.error('Polling scoreboard error:', err);
                            return EMPTY;
                        }),
                    ),
                ),
            )
            .subscribe();
        merge(timer(0, this.config.coopTrainingShortPollingPeriod), this.service.teams$)
            .pipe(
                filter(() => !!this.service.getTeam()),
                takeUntilDestroyed(this.destroyRef),
                exhaustMap(() =>
                    this.service.fetchMessages(this.service.getTeam()?.id).pipe(
                        catchError((err) => {
                            console.error('Polling messages error:', err);
                            return EMPTY;
                        }),
                    ),
                ),
            )
            .subscribe();
        timer(this.config.coopTrainingShortPollingPeriod, this.config.coopTrainingShortPollingPeriod)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                exhaustMap(() =>
                    this.service.refetchRun().pipe(
                        catchError((err) => {
                            console.error('Polling run data error:', err);
                            return EMPTY;
                        }),
                    ),
                ),
            )
            .subscribe();
    }

    onMessageSend(message: string) {
        this.service.sendMessage(message, this.service.getTeam()?.id).subscribe();
    }
}
