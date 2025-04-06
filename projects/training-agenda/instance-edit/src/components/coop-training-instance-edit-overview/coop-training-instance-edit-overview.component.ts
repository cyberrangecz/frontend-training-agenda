import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DeactivationDecorator } from '../deactivation-decorator';
import { FormGroup } from '@angular/forms';
import { MaxTeamSizeFormGroup } from './max-team-size-form-group';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '@crczp/training-agenda/internal';
import { TrainingInstanceEditService } from '../../services/state/edit/training-instance-edit.service';
import { SentinelUserAssignService } from '@sentinel/components/user-assign';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'crczp-coop-training-instance-edit-overview',
    templateUrl: './coop-training-instance-edit-overview.component.html',
    styleUrl: './coop-training-instance-edit-overview.component.css',
})
export class CoopTrainingInstanceEditOverviewComponent extends DeactivationDecorator implements OnInit {
    maxTeamSizeForm: WritableSignal<MaxTeamSizeFormGroup> = signal(new MaxTeamSizeFormGroup(12));

    destroyRef = inject(DestroyRef);

    constructor(private editService: TrainingInstanceEditService) {
        super();
    }

    ngOnInit() {
        this.editService.trainingInstance$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((instance) => {
            this.maxTeamSizeForm.set(new MaxTeamSizeFormGroup(instance.maxTeamSize));
        });
    }
}
