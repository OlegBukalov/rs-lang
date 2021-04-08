import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartLoadingComponent } from './start-loading.component';

describe('StartLoadingComponent', () => {
  let component: StartLoadingComponent;
  let fixture: ComponentFixture<StartLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartLoadingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
