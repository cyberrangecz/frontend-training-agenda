import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'kypo-assessment-wrapper',
  templateUrl: './assessment-wrapper.component.html',
  styleUrls: ['./assessment-wrapper.component.css'],
})
export class AssessmentWrapperComponent extends SentinelBaseDirective implements OnInit {
  trainingInstance: TrainingInstance;

  constructor(private activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.activeRoute.parent.data
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((data) => (this.trainingInstance = data.trainingInstance));
  }
}
