import { KypoTopologyGraphConfig } from '@muni-kypo-crp/topology-graph';

export class TrainingAgendaConfig {
  pollingPeriod: number;
  defaultPaginationSize: number;
  visualizationConfig: {
    trainingBasePath: string;
    adaptiveBasePath: string;
  };
  kypoTopologyConfig: KypoTopologyGraphConfig;
}
