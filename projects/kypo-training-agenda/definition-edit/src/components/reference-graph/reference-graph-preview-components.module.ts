import { CommandVisualizationConfig } from '@muni-kypo-crp/command-visualizations/internal';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReferenceGraphModule } from '@muni-kypo-crp/command-visualizations/reference-graph';
import { CommonModule } from '@angular/common';
import { ReferenceGraphPreviewComponent } from './reference-graph-preview.component';
import { ReferenceGraphDirective } from './directive/reference-graph.directive';
import { ReferenceGraphComponent } from './component/reference-graph.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  imports: [CommonModule, ReferenceGraphModule, MatExpansionModule, MatIconModule],
  exports: [ReferenceGraphPreviewComponent],
  declarations: [ReferenceGraphPreviewComponent, ReferenceGraphDirective, ReferenceGraphComponent],
})
export class ReferenceGraphPreviewComponentsModule {
  static forRoot(config: CommandVisualizationConfig): ModuleWithProviders<ReferenceGraphPreviewComponentsModule> {
    return {
      ngModule: ReferenceGraphPreviewComponentsModule,
      providers: [ReferenceGraphModule.forRoot(config).providers],
    };
  }
}
