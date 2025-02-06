import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { AccessLevel } from '@cyberrangecz-platform/training-model';

@Component({
  selector: 'kypo-access-level',
  templateUrl: './access-level.component.html',
  styleUrls: ['./access-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessLevelComponent {
  @Input() level: AccessLevel;

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
