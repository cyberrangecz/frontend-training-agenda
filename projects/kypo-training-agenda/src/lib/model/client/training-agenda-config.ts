import { Kypo2TopologyGraphConfig } from 'kypo2-topology-graph';

export class TrainingAgendaConfig {
  pollingPeriod: number;
  defaultPaginationSize: number;
  visualizationConfig: {
    trainingBasePath: string;
  };
  kypo2TopologyConfig: Kypo2TopologyGraphConfig;
}
