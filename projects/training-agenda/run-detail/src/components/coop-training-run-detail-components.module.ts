import { NgModule } from '@angular/core';
import { TrainingRunDetailComponentsModule } from '@crczp/training-agenda/run-detail';
import { TeamSidePanelComponent } from './team-side-panel/team-side-panel.component';
import { CoopTrainingRunDetailComponent } from './coop-training-run-detail.component';
import { CoopRunService } from '../services/training-run/running/coop-run.service';
import { CoopRunConcreteService } from '../services/training-run/running/coop-run-concrete.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { GridListComponent, PlayerViewComponent } from '@crczp/training-agenda/internal';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TeamsScoreboardComponent } from '../../../internal/src/components/teams-scoreboard/teams-scoreboard.component';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { MatFormField, MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Contains all components of training run detail
 */
@NgModule({
    imports: [
        TrainingRunDetailComponentsModule,
        AsyncPipe,
        MatIconModule,
        GridListComponent,
        MatCardModule,
        MatButtonModule,
        PlayerViewComponent,
        MatTooltipModule,
        TeamsScoreboardComponent,
        DatePipe,
        MatInput,
        MatFormField,
        ReactiveFormsModule,
    ],
    declarations: [CoopTrainingRunDetailComponent, TeamSidePanelComponent, ChatViewComponent],
    providers: [{ provide: CoopRunService, useClass: CoopRunConcreteService }],
    exports: [CoopTrainingRunDetailComponent],
})
export class CoopTrainingRunDetailComponentsModule {}
