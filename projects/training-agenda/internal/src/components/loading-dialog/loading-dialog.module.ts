import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingDialogComponent } from './loading-dialog.component';

@NgModule({
    declarations: [LoadingDialogComponent],
    exports: [LoadingDialogComponent],
    imports: [CommonModule, MatProgressSpinnerModule, MatDialogModule],
})
export class LoadingDialogModule {}
