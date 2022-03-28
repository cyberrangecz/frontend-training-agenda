import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[referenceGraph]',
})
export class ReferenceGraphDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
