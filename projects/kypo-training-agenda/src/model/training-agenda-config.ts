import { Kypo2TopologyGraphConfig } from '@muni-kypo-crp/topology-graph';

export class TrainingAgendaConfig {
  pollingPeriod: number;
  defaultPaginationSize: number;
  visualizationConfig: {
    trainingBasePath: string;
    adaptiveBasePath: string;
    elasticSearchBasePath: string;
  };
  kypo2TopologyConfig: Kypo2TopologyGraphConfig;
}
