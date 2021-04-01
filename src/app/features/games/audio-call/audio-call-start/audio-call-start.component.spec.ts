import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioCallStartComponent } from './audio-call-start.component';

describe('AudioCallStartComponent', () => {
  let component: AudioCallStartComponent;
  let fixture: ComponentFixture<AudioCallStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioCallStartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioCallStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
