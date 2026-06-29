import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateExamRequest, Exam } from '../models/exam.model';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/exams`;

  getAll(): Observable<Exam[]> {
    return this.http.get<Exam[]>(this.baseUrl);
  }

  getById(id: number): Observable<Exam> {
    return this.http.get<Exam>(`${this.baseUrl}/${id}`);
  }

  create(request: CreateExamRequest): Observable<Exam> {
    return this.http.post<Exam>(this.baseUrl, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
