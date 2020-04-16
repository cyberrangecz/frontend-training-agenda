/**
 * Displays notifications from training agenda services and components. Should be overridden by client
 */
export abstract class TrainingNotificationService {
  /**
   * Emits notification
   * @param type type of notification
   * @param message message of notification
   * @param duration optional duration of the notification
   */
  abstract emit(type: 'error' | 'warning' | 'info' | 'success', message: string, duration?: number): void;
}
