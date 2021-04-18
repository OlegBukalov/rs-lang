import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioCallGameComponent } from './audio-call-game.component';

describe('AudioCallGameComponent', () => {
  let component: AudioCallGameComponent;
  let fixture: ComponentFixture<AudioCallGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioCallGameComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioCallGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
