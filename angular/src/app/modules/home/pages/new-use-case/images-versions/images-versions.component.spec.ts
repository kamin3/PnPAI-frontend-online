import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesVersionsComponent } from './images-versions.component';

describe('ImagesVersionsComponent', () => {
  let component: ImagesVersionsComponent;
  let fixture: ComponentFixture<ImagesVersionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagesVersionsComponent]
    });
    fixture = TestBed.createComponent(ImagesVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
