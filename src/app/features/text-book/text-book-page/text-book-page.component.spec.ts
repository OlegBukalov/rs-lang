import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextBookPageComponent } from './text-book-page.component';

describe('TextBookPageComponent', () => {
  let component: TextBookPageComponent;
  let fixture: ComponentFixture<TextBookPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextBookPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextBookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
