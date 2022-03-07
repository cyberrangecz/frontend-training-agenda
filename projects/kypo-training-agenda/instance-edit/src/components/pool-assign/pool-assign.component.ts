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
import { SandboxPoolListAdapter } from '../../model/adapter/sandbox-pool-list-adapter';
import { TrainingNavigator } from '@muni-kypo-crp/training-agenda';

@Component({
  selector: 'kypo-pool-assign',
  templateUrl: './pool-assign.component.html',
  styleUrls: ['./pool-assign.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoolAssignComponent extends SentinelBaseDirective implements OnChanges {
  @Input() selectedPoolId: number;
  @Input() hasStarted: boolean;
  @Input() pools: SandboxPoolListAdapter[];
  @Output() selectionChanged: EventEmitter<number> = new EventEmitter();

  poolDetailRoute: string;

  constructor(private navigator: TrainingNavigator) {
    super();
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

  private createPoolDetailRoute(poolId: number) {
    this.poolDetailRoute = `/${this.navigator.toPool(poolId)}`;
  }
}
