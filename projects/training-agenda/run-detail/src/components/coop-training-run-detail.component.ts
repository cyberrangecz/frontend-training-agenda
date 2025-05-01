import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { merge, timer } from 'rxjs';
import { CoopTrainingRunService } from '../services/training-run/running/coop-training-run.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SentinelAuthService } from '@sentinel/auth';
import { filter } from 'rxjs/operators';
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
    private static readonly TEAM_INFO_REFRESH_INTERVAL = 30000; // 30 seconds
    private static readonly SCOREBOARD_REFRESH_INTERVAL = 3000;
    private static readonly MESSAGES_REFRESH_INTERVAL = 2000;
    private static readonly RUN_REFRESH_INTERVAL = 5000;

    currentUser$ = this.auth.activeUser$;

    private readonly destroyRef = inject(DestroyRef);

    constructor(
        protected service: CoopTrainingRunService,
        protected route: ActivatedRoute,
        private auth: SentinelAuthService,
    ) {}

    ngOnInit() {
        timer(0, CoopTrainingRunDetailComponent.TEAM_INFO_REFRESH_INTERVAL)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.service.fetchTeamInfo());
        timer(0, CoopTrainingRunDetailComponent.SCOREBOARD_REFRESH_INTERVAL)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.service.fetchScoreboard());
        merge(timer(0, CoopTrainingRunDetailComponent.MESSAGES_REFRESH_INTERVAL), this.service.teams$)
            .pipe(
                filter(() => !!this.service.getTeam()),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe(() => this.service.fetchMessages(this.service.getTeam()?.id));
        timer(0, CoopTrainingRunDetailComponent.RUN_REFRESH_INTERVAL)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.service.refetchRun());
    }

    onMessageSend(message: string) {
        this.service.sendMessage(message, this.service.getTeam()?.id);
    }
}
