import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { AccessPhase } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-access-phase',
  templateUrl: './access-phase.component.html',
  styleUrls: ['./access-phase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessPhaseComponent extends SentinelBaseDirective {
  @Input() phase: AccessPhase;

  @ViewChild('rightPanel', { static: true }) rightPanelDiv: ElementRef;

  topologyWidth: number;
  topologyHeight: number;

  constructor() {
    super();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.calculateTopologySize();
  }

  private calculateTopologySize() {
    this.topologyWidth = this.rightPanelDiv.nativeElement.getBoundingClientRect().width;
    this.topologyHeight = this.topologyWidth;
  }
}
