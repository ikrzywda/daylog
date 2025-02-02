import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInputDialogComponent } from './task-input-dialog.component';

describe('TaskInputDialogComponent', () => {
  let component: TaskInputDialogComponent;
  let fixture: ComponentFixture<TaskInputDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskInputDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
