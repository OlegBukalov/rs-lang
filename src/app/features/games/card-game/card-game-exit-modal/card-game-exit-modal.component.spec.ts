import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGameExitModalComponent } from './card-game-exit-modal.component';

describe('CardGameExitModalComponent', () => {
  let component: CardGameExitModalComponent;
  let fixture: ComponentFixture<CardGameExitModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardGameExitModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardGameExitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
