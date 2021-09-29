import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { InfoLevel } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-info-level',
  templateUrl: './info-level.component.html',
  styleUrls: ['./info-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Component to display training run's level of type INFO. Only displays markdown and allows user to continue immediately.
 */
export class InfoLevelComponent extends SentinelBaseDirective {
  @Input() level: InfoLevel;
  @Input() isLast: boolean;
  @Input() isPreview: boolean;
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
