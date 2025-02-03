import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  model,
} from '@angular/core';
import { TaskInputComponent } from '../task-input/task-input.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TaskDraft } from '../../task-log.models';
import { TaskLogService } from '../../services/task-log.service';

@Component({
  selector: 'app-task-input-dialog',
  templateUrl: './task-input-dialog.component.html',
  imports: [MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskInputDialog {
  readonly draft = model<TaskDraft>({
    title: '',
    contents: '',
    durationSeconds: 0,
  });

  constructor(
    private taskLogService: TaskLogService,
    readonly dialog: MatDialog
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogTaskInputDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.taskLogService.addTask(result);
      }
    });
  }
}

@Component({
  selector: 'dialog-task-input-dialog',
  imports: [
    TaskInputComponent,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogTitle,
  ],
  templateUrl: './dialog-task-input-dialog.component.html',
  styleUrl: './task-input-dialog.component.scss',
})
export class DialogTaskInputDialogComponent {
  taskDraft: TaskDraft;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: TaskDraft,
    private readonly dialogRef: MatDialogRef<DialogTaskInputDialogComponent>
  ) {
    this.taskDraft = { ...this.data };
  }

  handleClose() {
    this.dialogRef.close();
  }

  handleSave() {
    this.dialogRef.close(this.taskDraft);
  }
}
