import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FreeFormMaterialModule } from './free-form-material.module';
import { FreeFormComponent } from './free-form.component';

/**
 * Free form component module
 */
@NgModule({
  imports: [CommonModule, FormsModule, FreeFormMaterialModule, ReactiveFormsModule],
  declarations: [FreeFormComponent],
  exports: [FreeFormComponent],
})
export class FreeFormModule {}
