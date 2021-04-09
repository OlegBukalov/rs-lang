import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsAllComponent } from './statistics-all.component';

describe('StatisticsAllComponent', () => {
  let component: StatisticsAllComponent;
  let fixture: ComponentFixture<StatisticsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatisticsAllComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
