import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ExamService } from '../../services/exam';

@Component({
  selector: 'app-exam-form',
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './exam-form.html',
  styleUrl: './exam-form.scss',
})
export class ExamForm {
  private readonly fb = inject(FormBuilder);
  private readonly examService = inject(ExamService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly saving = signal(false);

  protected readonly form = this.fb.group({
    question: ['', [Validators.required, Validators.maxLength(2000)]],
    optionA: ['', Validators.maxLength(500)],
    optionB: ['', Validators.maxLength(500)],
    optionC: ['', Validators.maxLength(500)],
    optionD: ['', Validators.maxLength(500)],
    correctAnswer: [''],
  });

  protected onCancel(): void {
    this.router.navigate(['/']);
  }

  protected onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.saving.set(true);

    this.examService
      .create({
        question: value.question!.trim(),
        optionA: value.optionA?.trim() || null,
        optionB: value.optionB?.trim() || null,
        optionC: value.optionC?.trim() || null,
        optionD: value.optionD?.trim() || null,
        correctAnswer: value.correctAnswer || null,
      })
      .subscribe({
        next: () => {
          this.snackBar.open('บันทึกข้อสอบเรียบร้อยแล้ว', 'ปิด', { duration: 3000 });
          this.router.navigate(['/']);
        },
        error: () => {
          this.saving.set(false);
          this.snackBar.open('ไม่สามารถบันทึกข้อสอบได้', 'ปิด', { duration: 4000 });
        },
      });
  }
}
