import { Component, OnInit } from '@angular/core';
import { SentinelBaseDirective } from '@sentinel/common';
import { Level, TrainingInstance } from '@muni-kypo-crp/training-model';
import { ActivatedRoute } from '@angular/router';
import { exhaustMap, Observable, takeWhile } from 'rxjs';
import { map } from 'rxjs/operators';
import { WalkthroughService } from './services/walkthrough.service';

@Component({
  selector: 'kypo-walkthrough-wrapper',
  templateUrl: './walkthrough-wrapper.component.html',
  styleUrls: ['./walkthrough-wrapper.component.css'],
})
export class WalkthroughWrapperComponent extends SentinelBaseDirective implements OnInit {
  trainingInstance$: Observable<TrainingInstance>;
  levels$: Observable<Level[]>;

  constructor(private activeRoute: ActivatedRoute, private walkthroughService: WalkthroughService) {
    super();
  }

  ngOnInit(): void {
    this.trainingInstance$ = this.activeRoute.parent.data.pipe(
      map((data) => data.trainingInstance),
      takeWhile(() => this.isAlive)
    );
    this.levels$ = this.trainingInstance$.pipe(
      exhaustMap((trainingInstance) => this.walkthroughService.get(trainingInstance.trainingDefinition.id)),
      map((trainingDefinition) => trainingDefinition.levels)
    ) as Observable<Level[]>;
  }
}
