import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioCallEndComponent } from './audio-call-end.component';

describe('AudioCallEndComponent', () => {
  let component: AudioCallEndComponent;
  let fixture: ComponentFixture<AudioCallEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioCallEndComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioCallEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
