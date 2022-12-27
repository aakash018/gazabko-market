//? REVIEW RETURN REPORT

import { ProtuctType } from "./global";

export interface ReviewType {
  review: string;
  rating: number;
  id: number;
  user?: User;
  product?: ProtuctType;
}

export interface QuestionType {
  question: string;
  answer: string;
  id: number;
  user?: User;
  product?: ProtuctType;
  created_at: string;
  updated_at: string;
}
