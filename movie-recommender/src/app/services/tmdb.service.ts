import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GENRE_MAP } from '../constants/tmdb-map';
import { QuestionnaireAnswers } from '../models/questionnaire.model';
import { TMDBFilterParams, RecommendedMovieDetails } from '../models/tmdb.model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private API_KEY = environment.TMDB_API_KEY;
  private BASE_URL = 'https://api.themoviedb.org/3/discover/movie';

  constructor(private http: HttpClient) {}

  mapAnswersToFilters(answers: QuestionnaireAnswers): TMDBFilterParams {
    const filters: TMDBFilterParams = {};

    if (answers.genres) {
      filters.with_genres = answers.genres
        .map(genre => GENRE_MAP[genre])
        .filter(genre => genre !== undefined)
        .join('|');
    }

    if (answers.company) {
      filters['certification_country'] = 'GB'
      if (answers.company === 'family') {
        filters['certification.lte'] = '15';
      } else if (answers.company === 'kids') {
        filters['certification.lte'] = '12A';
      }
    }

    if (answers.runtime) {
      if (answers.runtime === 'short') {
        filters['with_runtime.lte'] = 90;
      } else if (answers.runtime === 'medium') {
        filters['with_runtime.gte'] = 89;
        filters['with_runtime.lte'] = 120;
      } else if (answers.runtime === 'long') {
        filters['with_runtime.gte'] = 119;
      }
    }

    if (answers.releaseYear) {
      if (answers.releaseYear === 'last5') {
        filters['primary_release_date.gte'] = new Date(new Date().setFullYear(new Date().getFullYear() - 5)).toISOString().split('T')[0];
      }
      else if (answers.releaseYear === 'last10') {
        filters['primary_release_date.gte'] = new Date(new Date().setFullYear(new Date().getFullYear() - 10)).toISOString().split('T')[0];
      } else if (answers.releaseYear === 'last20') {
        filters['primary_release_date.gte'] = new Date(new Date().setFullYear(new Date().getFullYear() - 20)).toISOString().split('T')[0];
      }
    }

    if (answers.popularity) {
      if (answers.popularity === 'popular') {
        filters.sort_by = 'popularity.desc';
      } else if (answers.popularity === 'hidden_gem') {
        filters.sort_by = 'popularity.asc';
      }
    }

    filters.include_adult = false;
    filters.page = Math.floor(Math.random() * 50) + 1;

    return filters;
  }

  discoverMovies(filters: any): Observable<any> {
    let params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', 'en-US');

    for (const key in filters) {
      if (filters[key]) {
        params = params.set(key, filters[key]);
        console.log(`Setting filter: ${key} = ${filters[key]}`);
      }
    }
    console.log('Final request parameters:', params.toString());
    console.log(this.http.get(this.BASE_URL, { params }));
    return this.http.get(this.BASE_URL, { params });
  }
  
  processMovies(tmdbResponse: any): RecommendedMovieDetails[] {
    return (tmdbResponse?.results || []).map((movie: any) => ({
      title: movie.title,
      release_date: movie.release_date,
      overview: movie.overview,
      genre_ids: movie.genre_ids,
      original_language: movie.original_language,
      vote_average: movie.vote_average,
      poster_path: movie.poster_path
    }));
  }
}
