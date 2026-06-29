import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Exam, ExamOption } from '../../models/exam.model';
import { ExamService } from '../../services/exam';
import { ConfirmDeleteDialog } from './confirm-delete-dialog';

@Component({
  selector: 'app-exam-list',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  templateUrl: './exam-list.html',
  styleUrl: './exam-list.scss',
})
export class ExamList implements OnInit {
  private readonly examService = inject(ExamService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  protected readonly exams = signal<Exam[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly answerState = signal<
    Record<number, { selected: string; isCorrect: boolean }>
  >({});

  ngOnInit(): void {
    this.loadExams();
  }

  protected getOptions(exam: Exam): ExamOption[] {
    const options: ExamOption[] = [];
    const map: Array<{ key: ExamOption['key']; value?: string | null }> = [
      { key: 'A', value: exam.optionA },
      { key: 'B', value: exam.optionB },
      { key: 'C', value: exam.optionC },
      { key: 'D', value: exam.optionD },
    ];

    for (const item of map) {
      if (item.value?.trim()) {
        options.push({ key: item.key, label: item.key, value: item.value });
      }
    }

    return options;
  }

  protected getSelectedAnswer(examId: number): string | null {
    return this.answerState()[examId]?.selected ?? null;
  }

  protected getAnswerFeedback(examId: number): 'correct' | 'incorrect' | null {
    const state = this.answerState()[examId];
    if (!state) {
      return null;
    }

    return state.isCorrect ? 'correct' : 'incorrect';
  }

  protected onAnswerSelect(exam: Exam, selectedKey: string): void {
    const correctAnswer = exam.correctAnswer?.toUpperCase();
    if (!correctAnswer) {
      return;
    }

    this.answerState.update((state) => ({
      ...state,
      [exam.id]: {
        selected: selectedKey,
        isCorrect: selectedKey === correctAnswer,
      },
    }));
  }

  protected onDelete(exam: Exam): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      width: '400px',
      data: { number: exam.number, question: exam.question },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) {
        return;
      }

      this.examService.delete(exam.id).subscribe({
        next: () => {
          this.snackBar.open(`ลบข้อสอบข้อที่ ${exam.number} แล้ว`, 'ปิด', { duration: 3000 });
          this.loadExams();
        },
        error: () => {
          this.snackBar.open('ไม่สามารถลบข้อสอบได้', 'ปิด', { duration: 4000 });
        },
      });
    });
  }

  protected onAdd(): void {
    this.router.navigate(['/add']);
  }

  private loadExams(): void {
    this.loading.set(true);
    this.error.set(null);

    this.examService.getAll().subscribe({
      next: (exams) => {
        this.exams.set(exams);
        this.answerState.set({});
        this.loading.set(false);
      },
      error: () => {
        this.error.set('ไม่สามารถโหลดรายการข้อสอบได้ กรุณาตรวจสอบว่า API ทำงานอยู่');
        this.loading.set(false);
      },
    });
  }
}
