import { Component, DestroyRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { TaskLogService } from '../../../services/task-log.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogTaskInputDialogComponent } from '../../task-input-dialog/task-input-dialog.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { selectSearchParams } from '../../../store/task-log.selectors';
import { debounceTime, distinctUntilChanged, map, take } from 'rxjs';
import { SearchParams } from '../../../task-log.models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-actions',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './task-actions.component.html',
  styleUrl: './task-actions.component.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
})
export class TaskActionsComponent {
  search$ = this.store.select(selectSearchParams);
  formGroup: FormGroup<{ search: FormControl<string | null> }>;

  constructor(
    private readonly store: Store,
    private taskLogService: TaskLogService,
    readonly dialog: MatDialog,
    private destroyRef: DestroyRef
  ) {
    this.formGroup = this.initializeInputFormGroup();
    this.initializeDataUpdateSubscription();
  }

  private initializeInputFormGroup(): FormGroup<{
    search: FormControl<string | null>;
  }> {
    const form = new FormGroup<{ search: FormControl<string | null> }>({
      search: new FormControl<string>(''),
    });

    this.search$
      .pipe(
        take(1),
        map((query: SearchParams) => query.search)
      )
      .subscribe((search) => {
        form.controls.search.setValue(search ?? null);
      });

    return form;
  }

  private initializeDataUpdateSubscription() {
    this.formGroup.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        map(({ search }) => {
          this.taskLogService.updateSearch({ search: search ?? undefined });
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  handleAdd() {
    const dialogRef = this.dialog.open(DialogTaskInputDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.taskLogService.addTask(result);
      }
    });
  }

  handleSubmit() {}
}
