import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBtnsComponent } from './game-btns.component';

describe('GameBtnsComponent', () => {
  let component: GameBtnsComponent;
  let fixture: ComponentFixture<GameBtnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameBtnsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
