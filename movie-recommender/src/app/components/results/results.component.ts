import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { ButtonComponent } from '../common/button/button.component';
import { loadMovies } from '../../store/tmdb/tmdb.actions';
import { TranslationsService } from '../../services/translations.service';
import { take } from 'rxjs/operators';
import { selectAnswers } from '../../store/questionnaire/questionnaire.selectors';
import { selectMovies } from '../../store/tmdb/tmdb.selectors';
import { Observable } from 'rxjs';
import { QuestionnaireAnswers } from '../../models/questionnaire-answers.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {
  public answers$!: Observable<QuestionnaireAnswers>;
  public movies$!: Observable<any>;
  public answerKeys: string[] = [];
  public recommendedMovie = '';
  public recommendedMovieDetails: any = {};
  public translations: any;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private translationsService: TranslationsService
  ) {
    this.translations = this.translationsService.labels;
  }

  ngOnInit() {
    this.answers$ = this.store.select(selectAnswers).pipe(
      map((answers: any) => ({
        genres: answers.genres ?? [],
        runtime: answers.runtime ?? '',
        company: answers.company ?? '',
        releaseYear: answers.releaseYear ?? '',
        popularity: answers.popularity ?? ''
      }))
    );

    this.answers$.pipe(take(1)).subscribe(answers => {
      const answerKeys = Object.keys(answers);
      this.answerKeys = answerKeys;

      const hasFiveAnswers = this.answerKeys.length === 5 && this.answerKeys.every(key => (answers as any)[key] && (answers as any)[key] !== undefined && (answers as any)[key] !== null);
      if (!hasFiveAnswers) {
        console.log('Not all questions answered, redirecting to home');
        this.router.navigate(['/']);
        return;
      }

      for (const key of answerKeys) {
        if ((answers as any)[key] === 'none') {
          this.answerKeys = this.answerKeys.filter(k => k !== key);
        }
      }

      this.store.dispatch(loadMovies({
        answers: {
          genres: Array.isArray(answers['genres']) ? answers['genres'] : [answers['genres']],
          runtime: answers['runtime'] || '',
          company: answers['company'] || '',
          releaseYear: answers['releaseYear'] || '',
          popularity: answers['popularity'] || ''
        }
      }));

      this.movies$ = this.store.select(selectMovies);

      this.movies$.pipe(take(1)).subscribe(movies => {
        console.log('Movies loaded:', movies);
        if (!movies || movies.length < 1) {
          this.recommendedMovie = this.translations.general.error;
          this.recommendedMovieDetails = {
            title: "No Movie Found",
            genre_ids: [],
            original_language: "en",
            overview: "No movies match your criteria.",
            popularity: 0,
            poster_path: "",
            release_date: "",
            vote_average: 0
          };
        }
        else {
          this.recommendedMovie = movies[0].title ?? 'Unknown Movie';
          this.recommendedMovieDetails = movies[0] || {
            title: "Movie Title",
            genre_ids: [28, 12],
            original_language: "en",
            overview: "This is a brief overview of the movie.",
            popularity: 123.45,
            poster_path: "/examplePosterPath.jpg",
            release_date: "2023-01-01",
            vote_average: 7.8
          };
        }
      });
    });
  }

  getTranslatedAnswer(answers: any, key: string): string {
    const value = answers[key];
    if (!value || value.length === 0) {
      return key;
    }
    if (Array.isArray(value)) {
      return value.map(val => this.translations[key]?.[val] ?? val).join(', ');
    }
    return this.translations[key]?.[value] ?? value;
  }

  finish() {
    this.router.navigate(['/']);
  }
}
