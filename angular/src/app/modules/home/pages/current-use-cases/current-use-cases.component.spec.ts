import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUseCasesComponent } from './current-use-cases.component';

describe('CurrentUseCasesComponent', () => {
  let component: CurrentUseCasesComponent;
  let fixture: ComponentFixture<CurrentUseCasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentUseCasesComponent]
    });
    fixture = TestBed.createComponent(CurrentUseCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
