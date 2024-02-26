import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinBetaComponent } from './join-beta.component';

describe('JoinBetaComponent', () => {
  let component: JoinBetaComponent;
  let fixture: ComponentFixture<JoinBetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinBetaComponent]
    });
    fixture = TestBed.createComponent(JoinBetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
