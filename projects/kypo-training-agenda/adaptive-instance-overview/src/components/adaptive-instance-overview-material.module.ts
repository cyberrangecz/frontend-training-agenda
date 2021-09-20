import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Material components for adaptive instance overview module
 */
@NgModule({
  imports: [MatButtonModule, ClipboardModule, MatTooltipModule, MatProgressSpinnerModule],
  exports: [MatButtonModule, ClipboardModule, MatTooltipModule, MatProgressSpinnerModule],
})
export class AdaptiveInstanceOverviewMaterialModule {}
