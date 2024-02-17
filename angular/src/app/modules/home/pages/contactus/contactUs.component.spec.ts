import { ComponentFixture, TestBed } from '@angular/core/testing';

import { contactUsComponent } from './contactus.component';

describe('contactUsComponent', () => {
  let component: contactUsComponent;
  let fixture: ComponentFixture<contactUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [contactUsComponent]
    });
    fixture = TestBed.createComponent(contactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
