import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusScoreComponent } from './bonus-score.component';

describe('BonusScoreComponent', () => {
  let component: BonusScoreComponent;
  let fixture: ComponentFixture<BonusScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
