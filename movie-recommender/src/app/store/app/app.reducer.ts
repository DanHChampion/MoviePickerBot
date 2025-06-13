import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';
import { TmdbState, tmdbReducer } from '../tmdb/tmdb.reducer';


export interface QuestionnaireState {
  answers: Record<string, any>
}

export interface AppState {
  questionnaire: QuestionnaireState;
  tmdb: TmdbState;
}

export const initialQuestionnaireState: QuestionnaireState = {
  answers: {},
};

export const initialAppState: AppState = {
  questionnaire: initialQuestionnaireState,
  tmdb: {
    movies: [],
    loading: false,
    error: null,
  }
};

export const reducers = {
  questionnaire: createReducer(
    initialQuestionnaireState,
    on(AppActions.saveAnswer, (state, { questionId, answer }) => ({
      ...state,
      answers: { ...state.answers, [questionId]: answer },
    })),
    on(AppActions.resetQuestionnaire, () => initialQuestionnaireState)
  )
};
