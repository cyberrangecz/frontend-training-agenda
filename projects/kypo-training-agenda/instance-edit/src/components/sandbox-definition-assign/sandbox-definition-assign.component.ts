import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SandboxDefinition } from '@muni-kypo-crp/sandbox-model';

@Component({
  selector: 'kypo-sandbox-definition-assign',
  templateUrl: './sandbox-definition-assign.component.html',
  styleUrls: ['./sandbox-definition-assign.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxDefinitionAssignComponent implements OnChanges {
  @Input() selectedSandboxDefinitionId: number;
  @Input() sandboxDefinitions: SandboxDefinition[];
  @Output() selectionChanged: EventEmitter<number> = new EventEmitter();

  sandboxDefinitionDetailRoute: string;

  ngOnChanges(changes: SimpleChanges): void {
    if ('selectedSandboxDefinitionId' in changes) {
      if (this.selectedSandboxDefinitionId) {
        this.createSandboxDefinitionDetailRoute(this.selectedSandboxDefinitionId);
      }
    }
  }

  onSelectionChange(sandboxDefinitionId: number): void {
    if (sandboxDefinitionId) {
      this.selectionChanged.emit(sandboxDefinitionId);
    } else {
      this.selectionChanged.emit(null);
    }
  }

  private createSandboxDefinitionDetailRoute(sandboxDefinitionId: number) {
    const definition = this.sandboxDefinitions.find((definition) => definition.id === sandboxDefinitionId);
    this.sandboxDefinitionDetailRoute = this.parseUrl(definition.url);
  }

  private parseUrl(gitUrl: string): string {
    let res = gitUrl;
    res = res.replace('git@', '');
    res = res.replace(':', '/');
    res = res.replace('.git', '');
    res = 'https://' + res;
    return res;
  }
}
