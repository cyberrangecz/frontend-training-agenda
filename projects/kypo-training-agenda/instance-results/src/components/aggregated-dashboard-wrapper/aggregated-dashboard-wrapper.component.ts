import { Component, OnInit } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { TrainingNavigator } from '@muni-kypo-crp/training-agenda';

@Component({
  selector: 'kypo-aggregated-dashboard-wrapper',
  templateUrl: './aggregated-dashboard-wrapper.component.html',
  styleUrls: ['./aggregated-dashboard-wrapper.component.css'],
})
export class AggregatedDashboardWrapperComponent extends SentinelBaseDirective implements OnInit {
  trainingInstance: TrainingInstance;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private navigator: TrainingNavigator) {
    super();
  }

  ngOnInit(): void {
    this.activeRoute.parent.data
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((data) => (this.trainingInstance = data.trainingInstance));
  }

  redirectToDetailView(instanceId: number): void {
    this.router.navigate([this.navigator.toTrainingInstanceResults(instanceId)]);
  }
}
