import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextBookCardComponent } from './text-book-card.component';

describe('TextBookCardComponent', () => {
  let component: TextBookCardComponent;
  let fixture: ComponentFixture<TextBookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextBookCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextBookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
