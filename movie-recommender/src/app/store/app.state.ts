import { TmdbState, initialTmdbState } from './tmdb/tmdb.reducer';
import { QuestionnaireState, initialQuestionnaireState } from './questionnaire/questionnaire.reducer';

export interface AppState {
  questionnaire: QuestionnaireState;
  tmdb: TmdbState;
}

export const initialAppState: AppState = {
  questionnaire: initialQuestionnaireState,
  tmdb: initialTmdbState
};

