import { async, TestBed } from '@angular/core/testing';
import { TrainingNotificationService } from '../../../../kypo-training-agenda/src/lib/services/client/training-notification.service';
import { ClientNotificationService } from './client-notification.service';

describe('ClientNotificationService', () => {
  let service: ClientNotificationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: TrainingNotificationService, useClass: ClientNotificationService }],
    }).compileComponents();
    service = TestBed.inject(TrainingNotificationService);
  }));

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
