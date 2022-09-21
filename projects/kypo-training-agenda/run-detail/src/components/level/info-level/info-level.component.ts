import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
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
export class InfoLevelComponent extends SentinelBaseDirective implements AfterViewInit {
  @Input() level: InfoLevel;
  @Input() isLast: boolean;
  @Input() isBacktracked: boolean;
  @Output() next: EventEmitter<void> = new EventEmitter();
  @ViewChild('controls', { read: ElementRef, static: false }) controlsPanel: ElementRef;
  @ViewChild('content', { read: ElementRef, static: false }) content: ElementRef;

  constructor() {
    super();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setContentMargin();
  }

  ngAfterViewInit(): void {
    this.setContentMargin();
  }

  onNext(): void {
    this.next.emit();
  }

  private setContentMargin(): void {
    this.content.nativeElement.setAttribute('style', `margin-bottom:${this.getControlsPanelOffset()}`);
  }

  // Workaround since position:sticky is not working due to overflow in mat-content
  private getControlsPanelOffset(): string {
    return this.controlsPanel?.nativeElement.offsetHeight + 'px';
  }
}
