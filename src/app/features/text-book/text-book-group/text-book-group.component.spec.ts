import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextBookGroupComponent } from './text-book-group.component';

describe('TextBookGroupComponent', () => {
  let component: TextBookGroupComponent;
  let fixture: ComponentFixture<TextBookGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextBookGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextBookGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
