import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {
  SentinelConfirmationDialogComponent,
  SentinelConfirmationDialogConfig,
  SentinelDialogResultEnum,
} from '@sentinel/components/dialogs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrainingInstanceEditOverviewComponent } from '../../components/training-instance-edit-overview.component';

/**
 * Route guard determining if navigation outside of training instance edit page should proceed
 */
@Injectable()
export class TrainingInstanceCanDeactivate implements CanDeactivate<TrainingInstanceEditOverviewComponent> {
  constructor(private dialog: MatDialog) {}

  canDeactivate(
    component: TrainingInstanceEditOverviewComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.canDeactivate()) {
      return true;
    }

    const dialogRef = this.dialog.open(SentinelConfirmationDialogComponent, {
      data: new SentinelConfirmationDialogConfig(
        'Unsaved Changes',
        'There are unsaved changes in training instance or organizers. Do you really want to leave?',
        'Cancel',
        'Leave'
      ),
    });
    return dialogRef.afterClosed().pipe(map((result) => result === SentinelDialogResultEnum.CONFIRMED));
  }
}
