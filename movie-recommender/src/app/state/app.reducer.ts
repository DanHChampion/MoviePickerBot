import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';

export interface QuestionnaireState {
  answers: Record<string, any>; // Store answers keyed by questionId
}

export interface AppState {
  questionnaire: QuestionnaireState;
}

export const initialQuestionnaireState: QuestionnaireState = {
  answers: {},
};

export const initialAppState: AppState = {
  questionnaire: initialQuestionnaireState,
};

export const reducers = {
  questionnaire: createReducer(
    initialQuestionnaireState,
    on(AppActions.saveAnswer, (state, { questionId, answer }) => ({
      ...state,
      answers: { ...state.answers, [questionId]: answer },
    })),
    on(AppActions.resetQuestionnaire, () => initialQuestionnaireState)
  ),
};
