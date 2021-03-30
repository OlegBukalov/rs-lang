import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavannaGameComponent } from './savanna-game.component';

describe('SavannaGameComponent', () => {
  let component: SavannaGameComponent;
  let fixture: ComponentFixture<SavannaGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavannaGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavannaGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
