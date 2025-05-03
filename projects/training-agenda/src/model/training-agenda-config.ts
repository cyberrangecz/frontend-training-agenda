import { TopologyGraphConfig } from '@crczp/topology-graph';

export class TrainingAgendaConfig {
    pollingPeriod: number;
    coopTrainingShortPollingPeriod: number;
    coopTrainingLongPollingPeriod: number;
    defaultPaginationSize: number;
    localModeAllowed?: boolean;
    visualizationConfig: {
        trainingBasePath: string;
        adaptiveBasePath: string;
    };
    topologyConfig: TopologyGraphConfig;
    teamNameKeywords: string[][];
}
