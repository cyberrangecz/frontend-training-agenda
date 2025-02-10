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
import { TrainingPhase } from '@cyberrangecz-platform/training-model';

@Component({
  selector: 'crczp-training-phase',
  templateUrl: './training-phase.component.html',
  styleUrls: ['./training-phase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingPhaseComponent implements OnChanges {
  @Input() phase: TrainingPhase;

  @ViewChild('rightPanel', { static: true }) rightPanelDiv: ElementRef;

  topologyWidth: number;
  topologyHeight: number;

  selectedTab: number;

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
