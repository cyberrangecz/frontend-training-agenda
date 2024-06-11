import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { takeWhile } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kypo-command-analysis-wrapper',
  templateUrl: './command-analysis-wrapper.component.html',
  styleUrls: ['./command-analysis-wrapper.component.css'],
})
export class CommandAnalysisWrapperComponent implements OnInit {
  trainingInstance: TrainingInstance;
  destroyRef = inject(DestroyRef);

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.parent.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => (this.trainingInstance = data.trainingInstance));
  }
}
