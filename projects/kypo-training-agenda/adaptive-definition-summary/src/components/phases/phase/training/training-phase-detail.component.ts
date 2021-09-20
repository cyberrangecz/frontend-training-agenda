import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TrainingPhase } from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';

@Component({
  selector: 'kypo-training-phase-detail',
  templateUrl: './training-phase-detail.component.html',
  styleUrls: ['./training-phase-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('bodyExpansion', [
      state('false, void', style({ height: '0px', visibility: 'hidden' })),
      state('true', style({ height: '*', visibility: 'visible' })),
      transition('true <=> false, void => false', animate('225ms ease')),
    ]),
  ],
})
export class TrainingPhaseDetailComponent extends SentinelBaseDirective {
  @Input() phase: TrainingPhase;
  @Input() expanded = false;

  toggle(): void {
    this.expanded = !this.expanded;
  }
}
