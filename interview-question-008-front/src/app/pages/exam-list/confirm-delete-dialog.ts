import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface ConfirmDeleteData {
  number: number;
  question: string;
}

@Component({
  selector: 'app-confirm-delete-dialog',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>ยืนยันการลบ</h2>
    <mat-dialog-content>
      <p>ต้องการลบข้อสอบข้อที่ {{ data.number }} ใช่หรือไม่?</p>
      <p class="question-preview">{{ data.question }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>ยกเลิก</button>
      <button mat-flat-button color="warn" [mat-dialog-close]="true">ลบ</button>
    </mat-dialog-actions>
  `,
  styles: `
    .question-preview {
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      margin-top: 8px;
    }
  `,
})
export class ConfirmDeleteDialog {
  protected readonly data = inject<ConfirmDeleteData>(MAT_DIALOG_DATA);
  protected readonly dialogRef = inject(MatDialogRef<ConfirmDeleteDialog>);
}
