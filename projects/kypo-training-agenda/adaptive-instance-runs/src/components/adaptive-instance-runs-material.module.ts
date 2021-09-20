import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

/**
 * Material components for training instance summary module
 */
@NgModule({
  imports: [MatExpansionModule, MatTableModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  exports: [MatExpansionModule, MatTableModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
})
export class AdaptiveInstanceSummaryMaterialModule {}
