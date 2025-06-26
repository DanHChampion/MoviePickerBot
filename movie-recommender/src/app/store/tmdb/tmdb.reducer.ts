import { createReducer, on } from '@ngrx/store';
import * as TmdbActions from './tmdb.actions';

export interface TmdbState {
  movies: any[] | undefined;
  loading: boolean;
  error: any;
}

export const initialTmdbState: TmdbState = {
  movies: [],
  loading: false,
  error: null,
};

export const tmdbReducer = createReducer(
  initialTmdbState,
  on(TmdbActions.loadMovies, state => ({ ...state, loading: true })),
  on(TmdbActions.loadMoviesSuccess, (state, { movies }) => ({
    ...state,
    movies: movies ?? [],
    loading: false,
    error: null,
  })),
  on(TmdbActions.loadMoviesFailure, (state, { error }) => ({
    ...state,
    movies: [],
    loading: false,
    error,
  }))
);
