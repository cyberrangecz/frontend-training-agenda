import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentinelBaseDirective } from '@sentinel/common';
import { Observable, take, takeWhile } from 'rxjs';
import { MitreTechniquesOverviewService } from '../services/mitre-techniques.service';

/**
 * Smart component of mitre techniques
 */
@Component({
  selector: 'kypo-mitre-techniques',
  templateUrl: './mitre-techniques.component.html',
  styleUrls: ['./mitre-techniques.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MitreTechniquesComponent extends SentinelBaseDirective implements OnInit {
  mitreTableHtml$: Observable<string>;
  showSwitch: boolean;
  played: boolean;

  constructor(
    private mitreTechniquesOverviewService: MitreTechniquesOverviewService,
    private activeRoute: ActivatedRoute
  ) {
    super();
    this.activeRoute.data.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.showSwitch = data.showSwitch;
      this.played = data.showSwitch;
    });
    this.mitreTableHtml$ = this.mitreTechniquesOverviewService.resource$;
  }

  ngOnInit(): void {
    this.loadData();
  }

  switchToggled() {
    this.played = !this.played;
    this.loadData();
  }

  loadData(): void {
    this.mitreTechniquesOverviewService.getMitreTechniques(this.played).pipe(take(1)).subscribe();
  }
}
