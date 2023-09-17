import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCaseResultComponent } from './use-case-result.component';

describe('UseCaseResultComponent', () => {
  let component: UseCaseResultComponent;
  let fixture: ComponentFixture<UseCaseResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UseCaseResultComponent]
    });
    fixture = TestBed.createComponent(UseCaseResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
