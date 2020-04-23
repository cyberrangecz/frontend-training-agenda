import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ClientErrorHandlerService {
  emit(err: HttpErrorResponse, operation: string, action: string): void {
    console.log(`${err.message} ${operation} with action ${action}`);
  }
}
