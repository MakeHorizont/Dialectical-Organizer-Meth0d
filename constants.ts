
import { QuestionStructure, CategoryType } from './types';

export const QUESTION_STRUCTURE: QuestionStructure[] = [
  // MODULE 1: HISTORICAL
  {
    id: 'q_history',
    type: CategoryType.HISTORICAL,
  },
  // MODULE 2: CLASS
  {
    id: 'q_class_interest',
    type: CategoryType.CLASS,
  },
  // MODULE 3: SYSTEMIC
  {
    id: 'q_system',
    type: CategoryType.SYSTEMIC,
  },
  // MODULE 4: IDEOLOGICAL
  {
    id: 'q_ideology',
    type: CategoryType.IDEOLOGICAL,
  }
];
