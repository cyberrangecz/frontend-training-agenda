import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingPhase } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-training-phase',
  templateUrl: './training-phase.component.html',
  styleUrls: ['./training-phase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingPhaseComponent extends SentinelBaseDirective implements OnChanges {
  @Input() phase: TrainingPhase;

  @ViewChild('rightPanel', { static: true }) rightPanelDiv: ElementRef;

  topologyWidth: number;
  topologyHeight: number;

  selectedTab: number;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('phase' in changes) {
      this.selectedTab = 0;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.calculateTopologySize();
  }

  calculateTopologySize() {
    this.topologyWidth = this.rightPanelDiv.nativeElement.getBoundingClientRect().width;
    this.topologyHeight = this.topologyWidth;
  }
}
