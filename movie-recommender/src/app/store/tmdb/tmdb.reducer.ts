import { createReducer, on } from '@ngrx/store';
import * as TmdbActions from './tmdb.actions';

export interface TmdbState {
  movies: any[];
  loading: boolean;
  error: any;
}

export const initialState: TmdbState = {
  movies: [],
  loading: false,
  error: null,
};

export const tmdbReducer = createReducer(
  initialState,
  on(TmdbActions.loadMovies, state => ({ ...state, loading: true })),
  on(TmdbActions.loadMoviesSuccess, (state, { movies }) => ({
    ...state,
    movies,
    loading: false,
    error: null,
  })),
  on(TmdbActions.loadMoviesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
