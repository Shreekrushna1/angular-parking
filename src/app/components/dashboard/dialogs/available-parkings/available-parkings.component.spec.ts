import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableParkingsComponent } from './available-parkings.component';

describe('AvailableParkingsComponent', () => {
  let component: AvailableParkingsComponent;
  let fixture: ComponentFixture<AvailableParkingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableParkingsComponent]
    });
    fixture = TestBed.createComponent(AvailableParkingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
