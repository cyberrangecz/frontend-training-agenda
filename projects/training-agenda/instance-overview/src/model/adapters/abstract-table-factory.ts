import { SentinelTable } from '@sentinel/components/table';
import { TrainingInstanceRowAdapter } from './training-instance-row-adapter';
import { SentinelControlItem } from '@sentinel/components/controls';

export abstract class AbstractTrainingInstanceTableFactory {
    abstract createTable(): SentinelTable<TrainingInstanceRowAdapter>;

    abstract createControls(): SentinelControlItem[];
}
