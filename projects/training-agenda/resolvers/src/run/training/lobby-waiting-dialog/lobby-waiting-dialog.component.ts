import { Component, DestroyRef, inject, Inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import { NgTemplateOutlet } from '@angular/common';
import { combineLatest, of, switchMap, throwError, timer } from 'rxjs';
import { TrainingInstanceLobbyApi } from '@crczp/training-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    DateHelper,
    GridListComponent,
    PlayerViewComponent,
    TeamOverviewComponent,
} from '@crczp/training-agenda/internal';
import { catchError, filter, map, take, tap } from 'rxjs/operators';
import { MatTooltip } from '@angular/material/tooltip';
import { Team } from '@crczp/training-model';
import { CoopTrainingNavigator } from '@crczp/training-agenda';
import { MatIcon } from '@angular/material/icon';
import { LogoSpinnerComponent } from '@crczp/theme';
import { Router } from '@angular/router';

@Component({
    selector: 'crczp-lobby-waiting-dialog',
    standalone: true,
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatTooltip,
        NgTemplateOutlet,
        TeamOverviewComponent,
        PlayerViewComponent,
        MatIcon,
        GridListComponent,
        LogoSpinnerComponent,
    ],
    templateUrl: './lobby-waiting-dialog.component.html',
    styleUrl: './lobby-waiting-dialog.component.css',
})
export class LobbyWaitingDialogComponent {
    private static readonly INSTANCE_END_TIME_RELOAD_TIMEOUT = 1000 * 60; // 1 minute
    private static readonly CHECK_TEAM_TIMEOUT = 1000 * 5; // 5 seconds
    private static readonly PLAYERS_COUNT_RELOAD_TIMEOUT = 1000 * 5; // 5 seconds

    constructor(
        public dialogRef: MatDialogRef<LobbyWaitingDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public accessToken: string,
        private api: TrainingInstanceLobbyApi,
    ) {
        timer(0, LobbyWaitingDialogComponent.CHECK_TEAM_TIMEOUT)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                switchMap(() =>
                    this.api.getTeamInfo(this.accessToken).pipe(
                        catchError((err: any) => {
                            if (err?.status === 425) {
                                return of(null);
                            }
                            return throwError(() => err);
                        }),
                    ),
                ),
                filter((team) => team !== null),
                take(1),
            )
            .subscribe((team) => this.teamSignal.set(team));

        timer(0, LobbyWaitingDialogComponent.PLAYERS_COUNT_RELOAD_TIMEOUT)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                filter((team) => team !== null),
                switchMap(() => this.api.getPlayersWaiting(this.accessToken, false)),
            )
            .subscribe((count) => this.playersWaitingSignal.set(count));

        const deadline$ = timer(0, LobbyWaitingDialogComponent.INSTANCE_END_TIME_RELOAD_TIMEOUT).pipe(
            takeUntilDestroyed(this.destroyRef),
            switchMap(() => this.api.getInstanceStartDate(this.accessToken)),
        );

        combineLatest([deadline$, timer(0, 1000)])
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                tap(([date]) => {
                    if (date.getTime() < Date.now() && this.teamSignal()) {
                        timer(1000)
                            .pipe(takeUntilDestroyed(this.destroyRef), take(1))
                            .subscribe(() => {
                                this.closeDialog();
                                this.router.navigate([this.trainingNavigator.toAccessTrainingRun(accessToken)]);
                            });
                    }
                }),
                map(([deadline]) =>
                    deadline.getTime() < Date.now() ? 'started' : DateHelper.timeBetweenDatesFull(new Date(), deadline),
                ),
            )
            .subscribe((dateStr) => this.timeToStartSignal.set(dateStr));
    }

    private trainingNavigator = inject(CoopTrainingNavigator);
    private router = inject(Router);

    private readonly destroyRef = inject(DestroyRef);

    teamSignal = signal<Team | null>(null);
    playersWaitingSignal = signal<number | null>(0);
    timeToStartSignal = signal<string | null>(null);

    closeDialog() {
        this.dialogRef.close();
    }

    getId = (item: { id: string }) => item.id;
}
