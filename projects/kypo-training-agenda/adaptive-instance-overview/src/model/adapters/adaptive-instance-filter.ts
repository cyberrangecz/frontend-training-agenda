import { SentinelFilter } from '@sentinel/common';

export class AdaptiveInstanceFilter extends SentinelFilter {
  constructor(value: string) {
    super('title', value);
  }
}
