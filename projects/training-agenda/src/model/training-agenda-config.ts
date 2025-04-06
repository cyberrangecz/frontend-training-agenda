import { TopologyGraphConfig } from '@crczp/topology-graph';

export class TrainingAgendaConfig {
    pollingPeriod: number;
    defaultPaginationSize: number;
    visualizationConfig: {
        trainingBasePath: string;
        adaptiveBasePath: string;
    };
    topologyConfig: TopologyGraphConfig;
    teamNameKeywords: string[][];
}
