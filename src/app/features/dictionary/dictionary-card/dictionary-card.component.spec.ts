import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryCardComponent } from './dictionary-card.component';

describe('DictionaryCardComponent', () => {
  let component: DictionaryCardComponent;
  let fixture: ComponentFixture<DictionaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DictionaryCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
