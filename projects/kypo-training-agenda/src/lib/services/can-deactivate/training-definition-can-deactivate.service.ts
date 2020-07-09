import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import {
  SentinelConfirmationDialogComponent,
  SentinelConfirmationDialogConfig,
  SentinelDialogResultEnum,
} from '@sentinel/components/dialogs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrainingDefinitionEditOverviewComponent } from '../../components/definition/edit/training-definition-edit-overview.component';

@Injectable()
/**
 * Route guard determining if navigation outside of training definition edit page should proceed
 */
export class TrainingDefinitionCanDeactivate implements CanDeactivate<TrainingDefinitionEditOverviewComponent> {
  constructor(private dialog: MatDialog) {}

  canDeactivate(
    component: TrainingDefinitionEditOverviewComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (component.canDeactivate()) {
      return true;
    }
    const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
      data: new SentinelConfirmationDialogConfig(
        'Unsaved Changes',
        'There are unsaved changes in training definition, authors or levels. Do you really want to leave without saving?',
        'Cancel',
        'Leave'
      ),
    });
    return dialogRef.afterClosed().pipe(map((result) => result === SentinelDialogResultEnum.CONFIRMED));
  }
}
