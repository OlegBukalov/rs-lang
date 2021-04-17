import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsDataWordComponent } from './statistics-data-word.component';

describe('StatisticsDataWordComponent', () => {
  let component: StatisticsDataWordComponent;
  let fixture: ComponentFixture<StatisticsDataWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatisticsDataWordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsDataWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
