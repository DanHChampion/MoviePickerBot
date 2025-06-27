import { ActionReducerMap } from '@ngrx/store';
import { questionnaireReducer, QuestionnaireState } from './questionnaire/questionnaire.reducer';
import { tmdbReducer, TmdbState } from './tmdb/tmdb.reducer';

export interface AppState {
  questionnaire: QuestionnaireState;
  tmdb: TmdbState;
}

export const reducers: ActionReducerMap<AppState> = {
  questionnaire: questionnaireReducer,
  tmdb: tmdbReducer,
};
