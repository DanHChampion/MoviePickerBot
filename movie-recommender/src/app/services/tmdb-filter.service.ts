import { Injectable } from '@angular/core';
import { GENRE_MAP } from '../constants/tmdb-map';
import { QuestionnaireAnswers } from '../models/questionnaire-answers.model';
import { TMDBFilterParams } from '../models/tmdb-filter-params.model';

@Injectable({ providedIn: 'root' })
export class TmdbFilterMapperService {
    mapAnswersToFilters(answers: QuestionnaireAnswers): TMDBFilterParams {
        const filters: TMDBFilterParams = {};

        if (answers.genres){
            filters.with_genres = answers.genres
                .map(genre => GENRE_MAP[genre])
                .filter(genre => genre !== undefined)
                .join('|');
        }

        if (answers.company) {
            if (answers.company === 'family') {
                filters.certification_lte = 'PG-13';
            } else if (answers.company === 'kids') {
                filters.certification_gte = 'G';
                filters.certification_lte = 'PG-13';
            }
        }

        if (answers.runtime) {
            if (answers.runtime === 'short') {
                filters.with_runtime_lte = 90;
            } else if (answers.runtime === 'medium') {
                filters.with_runtime_gte = 89;
                filters.with_runtime_lte = 120;
            } else if (answers.runtime === 'long') {
                filters.with_runtime_gte = 119;
            }
        }

        if (answers.releaseYear) {
            // maybe inculde anything before 1 week from the current date
            filters.primary_release_date_gte = answers.releaseYear;
        }

        if (answers.popularity) {
            if (answers.popularity === 'popular') {
                filters.sort_by = 'popularity.desc';
            }
            else if (answers.popularity === 'hidden_gem') {
                filters.sort_by = 'popularity.asc';
            }
        }

        return filters;
    }
}
