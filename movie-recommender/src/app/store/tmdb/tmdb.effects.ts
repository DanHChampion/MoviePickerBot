import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { loadMovies, loadMoviesSuccess, loadMoviesFailure } from './tmdb.actions';
import { TmdbService } from '../../services/tmdb.service';

@Injectable()
export class TmdbEffects {
  private actions$ = inject(Actions);
  private tmdbService = inject(TmdbService);

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMovies),
      mergeMap(action => {
        console.log('[TmdbEffects] loadMovies action received:', action);
        const filters = this.tmdbService.mapAnswersToFilters(action.answers);
        console.log('[TmdbEffects] Filters mapped from answers:', filters);
        return this.tmdbService.discoverMovies(filters).pipe(
          map(moviesResponse => {
            console.log('[TmdbEffects] Movies loaded successfully:', moviesResponse);
            const processedMovies = this.tmdbService.processMovies(moviesResponse);
            return loadMoviesSuccess({ movies: processedMovies });
          }),
          catchError(error => {
            console.error('[TmdbEffects] Error loading movies:', error);
            return of(loadMoviesFailure({ error }));
          })
        );
      })
    )
  );
}
