import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardGameListComponent } from './card-game-list.component';

describe('CardGameListComponent', () => {
  let component: CardGameListComponent;
  let fixture: ComponentFixture<CardGameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardGameListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
