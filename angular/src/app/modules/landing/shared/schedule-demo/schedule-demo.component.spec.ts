import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleDemoComponent } from './schedule-demo.component';

describe('ScheduleDemoComponent', () => {
  let component: ScheduleDemoComponent;
  let fixture: ComponentFixture<ScheduleDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleDemoComponent]
    });
    fixture = TestBed.createComponent(ScheduleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
