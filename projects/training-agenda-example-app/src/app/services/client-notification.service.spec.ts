import { TestBed, waitForAsync } from '@angular/core/testing';
import { TrainingNotificationService } from '../../../../training-agenda/src/services/training-notification.service';
import { ClientNotificationService } from './client-notification.service';

describe('ClientNotificationService', () => {
    let service: ClientNotificationService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: TrainingNotificationService, useClass: ClientNotificationService }],
        }).compileComponents();
        service = TestBed.inject(TrainingNotificationService);
    }));

    it('should create', () => {
        expect(service).toBeTruthy();
    });
});
