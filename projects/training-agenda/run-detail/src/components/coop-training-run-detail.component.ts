import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TeamInfo } from '@crczp/training-model';
import { Observable, switchMap, timer } from 'rxjs';
import { TeamSyncService } from '../services/training-run/running/team-sync.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    teamInfo$: Observable<TeamInfo>;

    private readonly destroyRef = inject(DestroyRef);

    constructor(private service: TeamSyncService) {}

    ngOnInit() {
        this.teamInfo$ = timer(0, 5000).pipe(
            takeUntilDestroyed(this.destroyRef),
            switchMap(() => this.service.updateTeamInfo()),
        );
    }
}
