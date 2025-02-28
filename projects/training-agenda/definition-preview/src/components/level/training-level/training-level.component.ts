import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { TrainingLevel } from '@crczp/training-model';

@Component({
    selector: 'crczp-training-level',
    templateUrl: './training-level.component.html',
    styleUrls: ['./training-level.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Component of a training level in a training run. Users needs to find out correct solution (answer) and submit it
 * before he can continue to the next level. User can optionally take hints.
 */
export class TrainingLevelComponent {
    @Input() level: TrainingLevel;

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
