import { Component } from '@angular/core';
import { DeactivationDecorator } from '../deactivation-decorator';

@Component({
    selector: 'crczp-linear-training-instance-edit-overview',
    templateUrl: './linear-training-instance-edit-overview.component.html',
    styleUrl: './linear-training-instance-edit-overview.component.css',
})
export class LinearTrainingInstanceEditOverviewComponent extends DeactivationDecorator {}
