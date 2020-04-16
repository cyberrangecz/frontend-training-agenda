export class ClientNotificationService {
  /**
   * Emits alert
   * @param type type of alert
   * @param message message of alert
   * @param duration optional duration of the alert
   */
  emit(type: 'error' | 'warning' | 'info' | 'success', message: string, duration?: number): void {
    console.log(type + ' ' + message);
  }
}
