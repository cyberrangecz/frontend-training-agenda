import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  SentinelNotification,
  SentinelNotificationResult,
  SentinelNotificationService,
  SentinelNotificationTypeEnum,
} from '@sentinel/layout/notification';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ClientErrorHandlerService {
  constructor(private notificationService: SentinelNotificationService) {}

  emit(err: HttpErrorResponse, operation: string, action?: string): Observable<boolean> {
    const notification: SentinelNotification = {
      type: SentinelNotificationTypeEnum.Error,
      title: operation,
      source: 'Training Agenda',
    };
    if (action !== undefined) {
      notification.action = action;
    }
    notification.additionalInfo = [err?.error?.message];
    return this.notificationService
      .emit(notification)
      .pipe(map((result) => result === SentinelNotificationResult.CONFIRMED));
  }
}
