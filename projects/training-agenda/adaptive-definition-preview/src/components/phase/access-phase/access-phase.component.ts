import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { AccessPhase } from '@cyberrangecz-platform/training-model';

@Component({
  selector: 'crczp-access-phase',
  templateUrl: './access-phase.component.html',
  styleUrls: ['./access-phase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessPhaseComponent {
  @Input() phase: AccessPhase;

  @ViewChild('rightPanel', { static: true }) rightPanelDiv: ElementRef;

  topologyWidth: number;
  topologyHeight: number;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.calculateTopologySize();
  }

  calculateTopologySize() {
    this.topologyWidth = this.rightPanelDiv.nativeElement.getBoundingClientRect().width;
    this.topologyHeight = this.topologyWidth;
  }
}
