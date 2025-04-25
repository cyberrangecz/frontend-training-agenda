import { NgModule } from '@angular/core';
import { TrainingRunDetailComponentsModule } from '@crczp/training-agenda/run-detail';
import { TeamSidePanelComponent } from './team-side-panel/team-side-panel.component';
import { CoopTrainingRunDetailComponent } from './coop-training-run-detail.component';
import { TeamSyncService } from '../services/training-run/running/team-sync.service';
import { TeamSyncConcreteService } from '../services/training-run/running/team-sync-concrete.service';
import { AsyncPipe } from '@angular/common';

/**
 * Contains all components of training run detail
 */
@NgModule({
    imports: [TrainingRunDetailComponentsModule, AsyncPipe],
    declarations: [CoopTrainingRunDetailComponent, TeamSidePanelComponent],
    providers: [{ provide: TeamSyncService, useClass: TeamSyncConcreteService }],
    exports: [CoopTrainingRunDetailComponent],
})
export class CoopTrainingRunDetailComponentsModule {}
