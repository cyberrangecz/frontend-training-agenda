import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

/**
 * Material component imports for training instance edit pages
 */
@NgModule({
    imports: [
        MatButtonModule,
        MatTooltipModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        MatCardModule,
        MatInputModule,
    ],
    exports: [
        MatButtonModule,
        MatTooltipModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        MatCardModule,
        MatInputModule,
    ],
})
export class TeamsManagementMaterialModule {}
