import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingLevel } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-training-level',
  templateUrl: './training-level.component.html',
  styleUrls: ['./training-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Component of a training level in a training run. Users needs to find out correct solution (answer) and submit it
 * before he can continue to the next level. User can optionally take hints.
 */
export class TrainingLevelComponent extends SentinelBaseDirective {
  @Input() level: TrainingLevel;

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

  calculateTopologySize() {
    this.topologyWidth = this.rightPanelDiv.nativeElement.getBoundingClientRect().width;
    this.topologyHeight = this.topologyWidth;
  }
}
