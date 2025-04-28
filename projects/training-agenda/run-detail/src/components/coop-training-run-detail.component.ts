import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { BehaviorSubject, filter, Observable, skipUntil, Subject, switchMap, timer } from 'rxjs';
import { CoopRunService } from '../services/training-run/running/coop-run.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LimitedScoreboard, Team, TeamMessage } from '@crczp/training-model';
import { SentinelAuthService } from '@sentinel/auth';

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
    private static readonly SCOREBOARD_REFRESH_INTERVAL = 5000; // 5 seconds
    private static readonly MESSAGES_REFRESH_INTERVAL = 5000; // 5 seconds

    teamInfoSubject = new BehaviorSubject<Team>(undefined);
    messagesSubject = new BehaviorSubject<TeamMessage[]>([]);
    scoreboardSubject = new BehaviorSubject<LimitedScoreboard>(undefined);

    teamInfo$: Observable<Team> = this.teamInfoSubject.asObservable();

    scoreboard$: Observable<LimitedScoreboard> = this.scoreboardSubject.asObservable();

    messages$: Observable<TeamMessage[]> = this.messagesSubject.asObservable();

    currentUser$ = this.auth.activeUser$;

    private readonly destroyRef = inject(DestroyRef);

    constructor(
        private service: CoopRunService,
        private auth: SentinelAuthService,
    ) {}

    ngOnInit() {
        timer(0, CoopTrainingRunDetailComponent.TEAM_INFO_REFRESH_INTERVAL)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                switchMap(() => this.service.fetchTeamInfo()),
            )
            .subscribe((team) => this.teamInfoSubject.next(team));
        timer(0, CoopTrainingRunDetailComponent.SCOREBOARD_REFRESH_INTERVAL)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                switchMap(() => this.service.fetchScoreboard()),
            )
            .subscribe(
                (scoreboard) => {
                    this.scoreboardSubject.next(scoreboard);
                }, //debug
                (err) => {
                    console.log('CoopTrainingRunDetailComponent.ERROR', err);
                },
                () => {
                    console.log('CoopTrainingRunDetailComponent.COMPLETE');
                },
            );
        timer(0, CoopTrainingRunDetailComponent.MESSAGES_REFRESH_INTERVAL)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                filter(() => !!this.teamInfoSubject.value),
                switchMap(() => this.service.fetchMessages(this.teamInfoSubject.value.id)),
            )
            .subscribe((msgs) => {
                this.messagesSubject.next(this.messagesSubject.value.concat(msgs));
            });
    }
}
