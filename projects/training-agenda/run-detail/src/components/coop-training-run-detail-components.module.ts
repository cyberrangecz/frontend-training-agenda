import { NgModule } from '@angular/core';
import { TeamSidePanelComponent } from './team-side-panel/team-side-panel.component';
import { CoopTrainingRunDetailComponent } from './coop-training-run-detail.component';
import { CoopTrainingRunService } from '../services/training-run/running/coop-training-run.service';
import { CoopTrainingRunConcreteService } from '../services/training-run/running/coop-training-run-concrete.service';
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
import { TrainingRunDetailComponentsModule } from './training-run-detail-components.module';

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
    providers: [{ provide: CoopTrainingRunService, useClass: CoopTrainingRunConcreteService }],
    exports: [CoopTrainingRunDetailComponent],
})
export class CoopTrainingRunDetailComponentsModule {}
