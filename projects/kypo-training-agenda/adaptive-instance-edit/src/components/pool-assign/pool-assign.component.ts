import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { Observable } from 'rxjs';
import { TrainingNavigator } from '@muni-kypo-crp/training-agenda';
import { TrainingAgendaContext } from '@muni-kypo-crp/training-agenda/internal';
import { SandboxPoolListAdapter } from '../../models/adapter/sandbox-pool-list-adapter';
import { AdaptiveInstanceEditService } from '../../services/state/edit/adaptive-instance-edit.service';
import { TrainingInstance } from '@muni-kypo-crp/training-model';

@Component({
  selector: 'kypo-pool-assign',
  templateUrl: './pool-assign.component.html',
  styleUrls: ['./pool-assign.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoolAssignComponent extends SentinelBaseDirective implements OnChanges {
  readonly PAGE_SIZE: number;

  @Input() selectedPoolId: number;
  @Input() hasStarted: boolean;
  @Input() trainingInstanceId: number;
  @Input() pools: SandboxPoolListAdapter[];
  @Output() selectionChanged: EventEmitter<number> = new EventEmitter();

  pools$: Observable<SandboxPoolListAdapter[]>;
  hasError$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  poolDetailRoute: string;

  constructor(
    private editService: AdaptiveInstanceEditService,
    private context: TrainingAgendaContext,
    private navigator: TrainingNavigator
  ) {
    super();
    this.PAGE_SIZE = this.context.config.defaultPaginationSize;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('selectedPoolId' in changes) {
      this.createPoolDetailRoute(this.selectedPoolId);
    }
  }

  onSelectionChange(poolId: number): void {
    if (poolId) {
      this.selectionChanged.emit(poolId);
    } else {
      this.selectionChanged.emit(null);
    }
  }

  isCreated(): boolean {
    return this.hasStarted && this.trainingInstanceId != null;
  }

  private createPoolDetailRoute(poolId: number) {
    this.poolDetailRoute = `/${this.navigator.toPool(poolId)}`;
  }
}
