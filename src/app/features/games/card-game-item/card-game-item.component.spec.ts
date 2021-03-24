import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardGameItemComponent } from './card-game-item.component';

describe('CardGameItemComponent', () => {
  let component: CardGameItemComponent;
  let fixture: ComponentFixture<CardGameItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardGameItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardGameItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
