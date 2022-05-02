import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainingInstance, TrainingRun } from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';
import { takeWhile } from 'rxjs';
@Component({
  selector: 'kypo-command-timeline-wrapper',
  templateUrl: './command-timeline-wrapper.component.html',
  styleUrls: ['./command-timeline-wrapper.component.css'],
})
export class CommandTimelineWrapperComponent extends SentinelBaseDirective implements OnInit {
  trainingRun: TrainingRun;

  constructor(private activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.activeRoute.parent.data
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((data) => (this.trainingRun = data.trainingRun));
  }
}
