import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

/**
 * Material component imports for shared module
 */
@NgModule({
  imports: [MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDividerModule],
  exports: [MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDividerModule],
})
export class FreeFormMaterialModule {}
