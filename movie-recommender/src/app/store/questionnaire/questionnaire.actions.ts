import { createAction, props } from '@ngrx/store';

export const loadAnswers = createAction(
  '[Questionnaire] Load Answers',
  props<{ answers: any }>()
);

export const loadAnswersSuccess = createAction(
  '[Questionnaire] Load Answers Success',
  props<{ answers: any }>()
);

export const loadAnswersFailure = createAction(
  '[Questionnaire] Load Answers Failure',
  props<{ error: any }>()
);

export const saveAnswer = createAction(
  '[Questionnaire] Save Answer',
  props<{ questionId: string; answer: any }>()
);

export const resetQuestionnaire = createAction('[Questionnaire] Reset');
