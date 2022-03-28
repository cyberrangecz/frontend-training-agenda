import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractPhaseTypeEnum, TrainingDefinition, TrainingLevel } from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';
import { ReferenceGraphDirective } from './directive/reference-graph.directive';
import { ReferenceGraphComponent } from './component/reference-graph.component';
import { ReferenceGraphTemplate } from './model/reference-graph-template';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'kypo-reference-graph-preview',
  templateUrl: './reference-graph-preview.component.html',
  styleUrls: ['./reference-graph-preview.component.css'],
})
export class ReferenceGraphPreviewComponent extends SentinelBaseDirective implements OnChanges, OnInit {
  @Input() trainingDefinition: TrainingDefinition;
  @Input() hasWarning: boolean;

  private hasReferenceSolutionSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  hasReferenceSolution$: Observable<boolean> = this.hasReferenceSolutionSubject$.asObservable();

  isExpanded: boolean;

  @ViewChild(ReferenceGraphDirective, { static: true }) referenceGraph!: ReferenceGraphDirective;

  ngOnInit(): void {
    this.containsReferenceSolution();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('hasWarning' in changes && !changes['hasWarning'].isFirstChange()) {
      this.containsReferenceSolution();
      if (this.hasReferenceSolutionSubject$.getValue() && !this.hasWarning) {
        this.loadComponent();
      }
    }
  }

  /**
   * Loads dynamic component on expansion panel expand if the training definition contains a reference solution
   * @param isExpanded expanded state of expansion panel
   */
  expandChange(isExpanded: boolean): void {
    console.log(isExpanded, this.isExpanded);
    if (!this.isExpanded && isExpanded) {
      // update graph only if changed data are saved
      if (!this.hasWarning) {
        this.loadComponent();
      }
    }
    this.isExpanded = isExpanded;
  }

  /**
   * Checks whether at least one training level of a training definition contains the reference solution
   * @private
   */
  private containsReferenceSolution(): void {
    this.hasReferenceSolutionSubject$.next(
      this.trainingDefinition.levels.some(
        (level) =>
          level.type === AbstractPhaseTypeEnum.Training && (level as TrainingLevel).referenceSolution.length > 0
      )
    );
  }

  /**
   * Deletes the previous instances of the dynamic reference graph component and creates a new one
   * @private
   */
  private loadComponent(): void {
    const viewContainerRef = this.referenceGraph.viewContainerRef;
    viewContainerRef.clear();

    const componentInstance = new ReferenceGraphTemplate(ReferenceGraphComponent, {
      trainingDefinitionId: this.trainingDefinition.id,
      hasReferenceSolution: this.hasReferenceSolution$,
    });

    const componentRef = viewContainerRef.createComponent<ReferenceGraphComponent>(componentInstance.component);
    componentRef.instance.trainingDefinitionId = componentInstance.data.trainingDefinitionId;
    componentRef.instance.hasReferenceSolution = componentInstance.data.hasReferenceSolution;
  }
}
