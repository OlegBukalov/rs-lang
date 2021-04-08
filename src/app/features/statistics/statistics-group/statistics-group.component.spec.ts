import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsGroupComponent } from './statistics-group.component';

describe('StatisticsGroupComponent', () => {
  let component: StatisticsGroupComponent;
  let fixture: ComponentFixture<StatisticsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatisticsGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
