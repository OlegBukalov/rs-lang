import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavannahGameComponent } from './savannah-game.component';

describe('SavannahGameComponent', () => {
  let component: SavannahGameComponent;
  let fixture: ComponentFixture<SavannahGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavannahGameComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavannahGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
