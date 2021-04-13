import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintGameOverComponent } from './sprint-game-over.component';

describe('SprintGameOverComponent', () => {
  let component: SprintGameOverComponent;
  let fixture: ComponentFixture<SprintGameOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SprintGameOverComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintGameOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
