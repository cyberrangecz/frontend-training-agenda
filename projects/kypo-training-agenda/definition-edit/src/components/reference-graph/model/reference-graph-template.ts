import { Type } from '@angular/core';

export class ReferenceGraphTemplate {
  constructor(public component: Type<any>, public data: any) {}
}
