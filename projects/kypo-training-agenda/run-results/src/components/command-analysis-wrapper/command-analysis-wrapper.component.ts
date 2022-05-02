import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'kypo-command-analysis-wrapper',
  templateUrl: './command-analysis-wrapper.component.html',
  styleUrls: ['./command-analysis-wrapper.component.css'],
})
export class CommandAnalysisWrapperComponent extends SentinelBaseDirective implements OnInit {
  trainingRun: TrainingInstance;

  constructor(private activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.activeRoute.parent.data
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((data) => (this.trainingRun = data.trainingRun));
  }
}
