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
import { InfoPhase } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-info-phase',
  templateUrl: './info-phase.component.html',
  styleUrls: ['./info-phase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoPhaseComponent extends SentinelBaseDirective implements AfterViewInit {
  @Input() phase: InfoPhase;
  @Input() isLast: boolean;
  @Input() isBacktracked: boolean;
  @Input() isLoading = false;
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
