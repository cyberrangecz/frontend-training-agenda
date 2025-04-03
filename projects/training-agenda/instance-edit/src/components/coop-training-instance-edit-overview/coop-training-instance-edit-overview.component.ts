import { Component } from '@angular/core';
import { DeactivationDecorator } from '../deactivation-decorator';

@Component({
    selector: 'crczp-coop-training-instance-edit-overview',
    templateUrl: './coop-training-instance-edit-overview.component.html',
    styleUrl: './coop-training-instance-edit-overview.component.css',
})
export class CoopTrainingInstanceEditOverviewComponent extends DeactivationDecorator {}
