import { TrainingDefinitionDetailComponent } from './training-definition-detail.component';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { MaterialTestingModule } from '../../../../internal/src/testing/material-testing.module';

describe('TrainingDefinitionDetailComponent', () => {
  let component: TrainingDefinitionDetailComponent;
  let fixture: ComponentFixture<TrainingDefinitionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialTestingModule],
      declarations: [TrainingDefinitionDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDefinitionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
