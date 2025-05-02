import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { exhaustMap, merge, timer } from 'rxjs';
import { CoopTrainingRunService } from '../services/training-run/running/coop-training-run.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SentinelAuthService } from '@sentinel/auth';
import { filter, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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
    private static readonly TEAM_INFO_REFRESH_INTERVAL = 30_000;
    private static readonly SCOREBOARD_REFRESH_INTERVAL = 6_000;
    private static readonly SCOREBOARD_INIT_INTERVAL = 5_000;
    private static readonly MESSAGES_REFRESH_INTERVAL = 10_000;
    private static readonly RUN_REFRESH_INTERVAL = 2_000;

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
    ) {}

    ngOnInit() {
        timer(0, CoopTrainingRunDetailComponent.TEAM_INFO_REFRESH_INTERVAL)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                exhaustMap(() => this.service.fetchTeamInfo()),
            )
            .subscribe();
        timer(
            CoopTrainingRunDetailComponent.SCOREBOARD_INIT_INTERVAL,
            CoopTrainingRunDetailComponent.SCOREBOARD_REFRESH_INTERVAL,
        )
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                exhaustMap(() => this.service.fetchScoreboard()),
            )
            .subscribe();
        merge(timer(0, CoopTrainingRunDetailComponent.MESSAGES_REFRESH_INTERVAL), this.service.teams$)
            .pipe(
                filter(() => !!this.service.getTeam()),
                takeUntilDestroyed(this.destroyRef),
                exhaustMap(() => this.service.fetchMessages(this.service.getTeam()?.id)),
            )
            .subscribe();
        timer(CoopTrainingRunDetailComponent.RUN_REFRESH_INTERVAL, CoopTrainingRunDetailComponent.RUN_REFRESH_INTERVAL)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                exhaustMap(() => this.service.refetchRun()),
            )
            .subscribe();
    }

    onMessageSend(message: string) {
        this.service.sendMessage(message, this.service.getTeam()?.id).subscribe();
    }
}
