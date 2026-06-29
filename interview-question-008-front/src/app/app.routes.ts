import { Routes } from '@angular/router';
import { ExamList } from './pages/exam-list/exam-list';
import { ExamForm } from './pages/exam-form/exam-form';

export const routes: Routes = [
  { path: '', component: ExamList, title: 'IT 08-1 — รายการข้อสอบ' },
  { path: 'add', component: ExamForm, title: 'IT 08-2 — เพิ่มข้อสอบ' },
  { path: '**', redirectTo: '' },
];
