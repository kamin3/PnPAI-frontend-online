import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageConnectorsComponent } from './image-connectors.component';

describe('ImageConnectorsComponent', () => {
  let component: ImageConnectorsComponent;
  let fixture: ComponentFixture<ImageConnectorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageConnectorsComponent]
    });
    fixture = TestBed.createComponent(ImageConnectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
