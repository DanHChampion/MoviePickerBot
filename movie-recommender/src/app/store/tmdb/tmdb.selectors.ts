import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { TmdbState } from './tmdb.reducer';

export const selectTmdbState = (state: AppState) => state.tmdb;
export const selectMovies = createSelector(
  selectTmdbState,
  (state: TmdbState) => state?.movies
);