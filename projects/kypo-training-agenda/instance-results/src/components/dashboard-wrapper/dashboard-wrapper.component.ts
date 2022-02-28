import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';
import { TrainingInstance } from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';
import { map, Observable, takeWhile, tap } from 'rxjs';

@Component({
  selector: 'kypo-dashboard-wrapper',
  templateUrl: './dashboard-wrapper.component.html',
  styleUrls: ['./dashboard-wrapper.component.css'],
})
export class DashboardWrapperComponent extends SentinelBaseDirective implements OnInit {
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
