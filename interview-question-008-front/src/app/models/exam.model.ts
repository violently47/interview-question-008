export interface Exam {
  id: number;
  number: number;
  question: string;
  optionA?: string | null;
  optionB?: string | null;
  optionC?: string | null;
  optionD?: string | null;
  correctAnswer?: string | null;
  createdAt: string;
}

export interface CreateExamRequest {
  question: string;
  optionA?: string | null;
  optionB?: string | null;
  optionC?: string | null;
  optionD?: string | null;
  correctAnswer?: string | null;
}

export interface ExamOption {
  key: 'A' | 'B' | 'C' | 'D';
  label: string;
  value: string;
}
