import { LinearTrainingInstanceTableFactory } from './linear-training-instance-table-factory';
import { RowAction } from '@sentinel/components/table';
import { TrainingInstance } from '@crczp/training-model';
import { defer, of } from 'rxjs';
import { CoopTrainingInstanceOverviewService } from '../../services/state/coop-training-instance-overview-concrete.service';
import { PaginatedResource } from '@sentinel/common/pagination';
import { CoopTrainingNavigator } from '../../../../src/services/coop-training-navigator.service';

/**
 * @dynamic
 */
export class CoopTrainingInstanceTableFactory extends LinearTrainingInstanceTableFactory {
    constructor(
        resource: PaginatedResource<TrainingInstance>,
        service: CoopTrainingInstanceOverviewService,
        navigator: CoopTrainingNavigator,
    ) {
        super(resource, service, navigator);
    }

    protected createActions(ti: TrainingInstance, service: CoopTrainingInstanceOverviewService): RowAction[] {
        return [
            new RowAction(
                'teams_management',
                'Manage Teams',
                'groups',
                'primary',
                'Assign players to teams',
                of(false),
                defer(() => service.teamsManagement(ti.id)),
            ),
        ].concat(super.createActions(ti, service));
    }
}
