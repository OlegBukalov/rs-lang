import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsDayComponent } from './statistics-day.component';

describe('StatisticsDayComponent', () => {
  let component: StatisticsDayComponent;
  let fixture: ComponentFixture<StatisticsDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatisticsDayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
