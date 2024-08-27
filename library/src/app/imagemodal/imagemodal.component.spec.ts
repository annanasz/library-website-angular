import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagemodalComponent } from './imagemodal.component';

describe('ImagemodalComponent', () => {
  let component: ImagemodalComponent;
  let fixture: ComponentFixture<ImagemodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagemodalComponent]
    });
    fixture = TestBed.createComponent(ImagemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
