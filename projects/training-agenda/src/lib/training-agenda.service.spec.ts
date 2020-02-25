import { TestBed } from '@angular/core/testing';

import { TrainingAgendaService } from './training-agenda.service';

describe('TrainingAgendaService', () => {
  let service: TrainingAgendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingAgendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
