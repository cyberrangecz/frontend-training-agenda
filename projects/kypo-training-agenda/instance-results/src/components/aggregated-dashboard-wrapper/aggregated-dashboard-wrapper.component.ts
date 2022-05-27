import { Component, OnInit } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'kypo-aggregated-dashboard-wrapper',
  templateUrl: './aggregated-dashboard-wrapper.component.html',
  styleUrls: ['./aggregated-dashboard-wrapper.component.css'],
})
export class AggregatedDashboardWrapperComponent extends SentinelBaseDirective implements OnInit {
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
