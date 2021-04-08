import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextBookSettingsComponent } from './text-book-settings.component';

describe('TextBookSettingsComponent', () => {
  let component: TextBookSettingsComponent;
  let fixture: ComponentFixture<TextBookSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextBookSettingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextBookSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
