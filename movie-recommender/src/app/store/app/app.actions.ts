import { createAction, props } from '@ngrx/store';

// Action to save answer to a question in the questionnaire
export const saveAnswer = createAction(
  '[Questionnaire] Save Answer',
  props<{ questionId: string; answer: any }>()
);

// Action to clear/reset the questionnaire
export const resetQuestionnaire = createAction('[Questionnaire] Reset');
