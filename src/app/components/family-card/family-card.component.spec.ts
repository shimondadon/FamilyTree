import { ComponentFixture, TestBed } from '@angular/core/testing';

import { familyCardComponent } from './family-card.component';

describe('familyCardComponent', () => {
  let component: familyCardComponent;
  let fixture: ComponentFixture<familyCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [familyCardComponent]
    });
    fixture = TestBed.createComponent(familyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
