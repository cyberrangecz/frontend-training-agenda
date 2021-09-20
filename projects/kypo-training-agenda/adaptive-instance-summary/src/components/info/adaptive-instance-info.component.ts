import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { SentinelControlItem } from '@sentinel/components/controls';
import { Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { AdaptiveInstanceInfoControls } from '../../model/adaptive-instance-info-controls';

/**
 * Component for displaying basic info about selected training instance.
 */
@Component({
  selector: 'kypo-training-instance-info',
  templateUrl: './adaptive-instance-info.component.html',
  styleUrls: ['./adaptive-instance-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdaptiveInstanceInfoComponent extends SentinelBaseDirective implements OnInit, OnChanges {
  @Input() trainingInstance: TrainingInstance;
  @Input() accessTokenLink: string;
  @Input() poolIdLink: string;
  @Input() adaptiveDefinitionLink: string;
  @Input() hasStarted$: Observable<boolean>;

  @Output() showProgress: EventEmitter<boolean> = new EventEmitter();
  @Output() showNotification: EventEmitter<string[]> = new EventEmitter();

  trainingDefinition: TrainingDefinition;

  infoControls: SentinelControlItem[];

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initInfoComponent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('trainingInstance' in changes && this.trainingInstance) {
      this.trainingDefinition = this.trainingInstance.trainingDefinition;
    }
  }

  onInfoControlAction(control: SentinelControlItem): void {
    control.result$.pipe(takeWhile(() => this.isAlive)).subscribe();
  }

  private initInfoComponent() {
    const disabled$ = this.hasStarted$.pipe(map((hasStated) => !hasStated));
    this.infoControls = AdaptiveInstanceInfoControls.create(this.showProgress, disabled$);
  }

  onCopyToken(): void {
    this.showNotification.emit(['success', 'Access token has been copied']);
  }
}
