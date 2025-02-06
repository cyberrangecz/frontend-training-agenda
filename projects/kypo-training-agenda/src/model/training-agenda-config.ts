import { KypoTopologyGraphConfig } from '@cyberrangecz-platform/topology-graph';

export class TrainingAgendaConfig {
  pollingPeriod: number;
  defaultPaginationSize: number;
  visualizationConfig: {
    trainingBasePath: string;
    adaptiveBasePath: string;
  };
  kypoTopologyConfig: KypoTopologyGraphConfig;
}
