import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { InfoPhase } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-info-phase',
  templateUrl: './info-phase.component.html',
  styleUrls: ['./info-phase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoPhaseComponent extends SentinelBaseDirective {
  @Input() phase: InfoPhase;
  @Input() isLast: boolean;
  @Input() isPreview: boolean;
  @Input() isLoading = false;
  @Output() next: EventEmitter<void> = new EventEmitter();
  @ViewChild('controls', { read: ElementRef, static: true }) controlsPanel: ElementRef;

  constructor() {
    super();
  }

  onNext(): void {
    this.next.emit();
  }

  // Workaround since position:sticky is not working due to overflow in mat-content
  getControlsPanelOffset(): string {
    return this.controlsPanel?.nativeElement.offsetHeight + 'px';
  }
}
