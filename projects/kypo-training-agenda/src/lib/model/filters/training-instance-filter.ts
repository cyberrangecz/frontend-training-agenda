import { SentinelFilter } from '@sentinel/common';

export class TrainingInstanceFilter extends SentinelFilter {
  constructor(value: string) {
    super('title', value);
  }
}
