import { TrainingDefinitionDetailComponent } from './training-definition-detail.component';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { MaterialTestingModule } from '../../../../internal/src/testing/material-testing.module';

describe('TrainingDefinitionDetailComponent', () => {
  let component: TrainingDefinitionDetailComponent;
  let fixture: ComponentFixture<TrainingDefinitionDetailComponent>;
  let cd: ChangeDetectorRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialTestingModule],
      declarations: [TrainingDefinitionDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDefinitionDetailComponent);
    component = fixture.componentInstance;
    cd = fixture.componentRef.injector.get(ChangeDetectorRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
