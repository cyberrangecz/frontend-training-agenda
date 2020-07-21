import { Kypo2TopologyGraphConfig } from 'kypo2-topology-graph';

export class TrainingAgendaConfig {
  pollingPeriod: number;
  defaultPaginationSize: number;
  visualizationConfig: {
    trainingBasePath: string;
    elasticSearchBasePath: string;
  };
  kypo2TopologyConfig: Kypo2TopologyGraphConfig;
}
