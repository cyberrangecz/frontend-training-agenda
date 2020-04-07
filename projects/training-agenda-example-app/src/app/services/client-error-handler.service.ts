import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class ClientErrorHandlerService {

  emit(err: HttpErrorResponse, operation: string): void {
    console.log(`${err.message} ${operation}`);
  }
}
