import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as TmdbActions from './tmdb.actions';
import { TmdbService } from '../../services/tmdb.service';
import { TmdbFilterMapperService } from '../../services/tmdb-filter.service';

@Injectable()
export class TmdbEffects {
  private actions$ = inject(Actions);
  private tmdbService = inject(TmdbService);
  private filterMapper = inject(TmdbFilterMapperService);

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TmdbActions.loadMovies),
      mergeMap(action => {
        const filters = this.filterMapper.mapAnswersToFilters(action.answers);
        return this.tmdbService.discoverMovies(filters).pipe(
          map(movies => TmdbActions.loadMoviesSuccess({ movies })),
          catchError(error => of(TmdbActions.loadMoviesFailure({ error })))
        );
      })
    )
  );
}
