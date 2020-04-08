import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FreeFormComponent} from './free-form/free-form.component';
import {FreeFormMaterialModule} from './free-form-material.module';

/**
 * Module wrapping collection of services and components shared across the application
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FreeFormMaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FreeFormComponent,
  ],
  exports: [
    FreeFormComponent,
  ],
})

export class FreeFormModule {

}
