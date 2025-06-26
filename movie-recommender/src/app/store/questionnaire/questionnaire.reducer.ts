import { createReducer, on } from '@ngrx/store';
import * as AppActions from './questionnaire.actions';

export interface QuestionnaireState {
  answers: Record<string, any>
}

export const initialQuestionnaireState: QuestionnaireState = {
  answers: {},
};

export const reducers = {
  questionnaire: createReducer(
    initialQuestionnaireState,
    on(AppActions.loadAnswers, (state, { answers }) => ({
      ...state,
      answers: { ...state.answers, ...answers },
    })),
    on(AppActions.saveAnswer, (state, { questionId, answer }) => ({
      ...state,
      answers: { ...state.answers, [questionId]: answer },
    })),
    on(AppActions.resetQuestionnaire, () => initialQuestionnaireState)
  )
};
