import { Component, Input } from '@angular/core';
import { TrainingUser } from '@crczp/training-model';

@Component({
    standalone: true,
    selector: 'crczp-player-view',
    templateUrl: './player-view.component.html',
    styleUrl: './player-view.component.scss',
    imports: [],
})
export class PlayerViewComponent {
    @Input({ required: true }) player: TrainingUser;
}
