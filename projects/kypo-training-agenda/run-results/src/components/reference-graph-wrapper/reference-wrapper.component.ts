import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainingRun } from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'kypo-reference-wrapper',
  templateUrl: './reference-wrapper.component.html',
  styleUrls: ['./reference-wrapper.component.css'],
})
export class ReferenceGraphWrapperComponent extends SentinelBaseDirective implements OnInit {
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
