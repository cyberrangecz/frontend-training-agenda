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
import { InfoLevel, InfoPhase } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-info-phase',
  templateUrl: './info-phase.component.html',
  styleUrls: ['./info-phase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoPhaseComponent {
  @Input() phase: InfoPhase;
  @Input() isLast: boolean;
  @Input() isBacktracked: boolean;
  @Output() next: EventEmitter<void> = new EventEmitter();

  onNext(): void {
    this.next.emit();
  }
}
