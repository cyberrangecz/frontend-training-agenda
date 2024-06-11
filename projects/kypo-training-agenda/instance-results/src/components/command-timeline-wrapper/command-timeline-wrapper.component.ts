import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'kypo-command-timeline-wrapper',
  templateUrl: './command-timeline-wrapper.component.html',
  styleUrls: ['./command-timeline-wrapper.component.css'],
})
export class CommandTimelineWrapperComponent implements OnInit {
  trainingInstance: TrainingInstance;
  destroyRef = inject(DestroyRef);

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.parent.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => (this.trainingInstance = data.trainingInstance));
  }
}
