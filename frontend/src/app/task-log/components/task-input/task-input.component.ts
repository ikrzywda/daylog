import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { TaskDraft } from '../../task-log.models';

type TaskDraftFormGroup = {
  [key in keyof TaskDraft]: FormControl<string | null>;
};

type TaskDraftFormGroupResult = Partial<{
  [key in keyof TaskDraft]: string | null;
}>;

@Component({
  selector: 'app-task-input',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './task-input.component.html',
  styleUrl: './task-input.component.scss',
})
export class TaskInputComponent {
  @Input({ required: true }) taskDraft: TaskDraft = {
    title: '',
    contents: '',
    durationSeconds: 0,
  };
  @Output() taskDraftChange = new EventEmitter<TaskDraft>();

  constructor(private destroyRef: DestroyRef) {}

  taskInputFormGroup = new FormGroup<TaskDraftFormGroup>({
    title: new FormControl(this.taskDraft.title, Validators.minLength(1)),
    contents: new FormControl(this.taskDraft.contents, Validators.minLength(1)),
    durationSeconds: new FormControl(
      this.taskDraft.durationSeconds.toString(),
      Validators.pattern('^(0|[1-9][0-9]*)$')
    ),
  });

  valueChangesSubscription$ = this.taskInputFormGroup.valueChanges
    .pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map((draftContents) => {
        const draft = this.validateInput(draftContents);
        if (draft) {
          console.log('DARFT', draft);
          this.taskDraftChange.emit(draft);
        }
      }),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe();

  validateInput(
    taskDraftFormGroup: TaskDraftFormGroupResult
  ): TaskDraft | null {
    const { title, contents, durationSeconds } = taskDraftFormGroup;
    if (!title || !contents || !durationSeconds) {
      return null;
    }

    return {
      title,
      contents,
      durationSeconds: parseInt(durationSeconds),
    };
  }
}
