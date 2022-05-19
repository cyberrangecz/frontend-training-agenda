import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractLevelTypeEnum, Level } from '@muni-kypo-crp/training-model';
import { SentinelBaseDirective } from '@sentinel/common';
import { SentinelControlItem } from '@sentinel/components/controls';
import { LevelDetailExpandControls } from '../../model/level-detail-expand-controls';
import { takeWhile } from 'rxjs/operators';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'kypo-training-definition-levels',
  templateUrl: './training-definition-levels.component.html',
  styleUrls: ['./training-definition-levels.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingDefinitionLevelsDetailComponent extends SentinelBaseDirective implements OnInit {
  @Input() levels: Level[];

  @ViewChild(MatAccordion) accordion: MatAccordion;

  controls: SentinelControlItem[];

  ngOnInit(): void {
    this.controls = LevelDetailExpandControls.create();
  }

  onControlsAction(control: SentinelControlItem): void {
    control.result$.pipe(takeWhile(() => this.isAlive)).subscribe((res) => {
      res === 'expand' ? this.accordion.openAll() : this.accordion.closeAll();
    });
  }

  getInfoLevels(): Level[] {
    return this.levels.filter((level) => level.type === AbstractLevelTypeEnum.Info);
  }

  getAccessLevels(): Level[] {
    return this.levels.filter((level) => level.type === AbstractLevelTypeEnum.Access);
  }

  getTrainingLevels(): Level[] {
    return this.levels.filter((level) => level.type === AbstractLevelTypeEnum.Training);
  }

  getAssessmentLevels(): Level[] {
    return this.levels.filter((level) => level.type === AbstractLevelTypeEnum.Assessment);
  }
}
