import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingAgendaComponent } from './training-agenda.component';

describe('TrainingAgendaComponent', () => {
  let component: TrainingAgendaComponent;
  let fixture: ComponentFixture<TrainingAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
