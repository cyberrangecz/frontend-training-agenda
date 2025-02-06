import { Injectable } from '@angular/core';

@Injectable()
export class ClientNotificationService {
  /**
   * Emits alert
   * @param type type of alert
   * @param message message of alert
   * @param action name of the action button displayed in the notification
   *  Returns observable.
   *  Value of the observable is true if the provided action was selected, false otherwise (no reaction or dismissed)
   */
  emit(type: 'error' | 'warning' | 'info' | 'success', message: string, action?: string): void {
    console.log(`${type} ${message} with action ${action}`);
  }
}
