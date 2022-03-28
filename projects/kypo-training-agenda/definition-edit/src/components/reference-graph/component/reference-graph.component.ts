import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './reference-graph.component.html',
  styleUrls: ['./reference-graph.component.css'],
})
export class ReferenceGraphComponent {
  @Input() trainingDefinitionId: number;
  @Input() hasReferenceSolution: Observable<boolean>;
}
