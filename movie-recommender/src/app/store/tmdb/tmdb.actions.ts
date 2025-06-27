import { createAction, props } from '@ngrx/store';
import { QuestionnaireAnswers } from '../../models/questionnaire.model';

export const loadMovies = createAction(
  '[TMDB] Load Movies',
  props<{ answers: QuestionnaireAnswers }>()
);

export const loadMoviesSuccess = createAction(
  '[TMDB] Load Movies Success',
  props<{ movies: any[] | undefined }>()
);

export const loadMoviesFailure = createAction(
  '[TMDB] Load Movies Failure',
  props<{ error: any }>()
);
