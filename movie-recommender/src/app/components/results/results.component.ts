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
import { selectMovies, selectMoviesLoading } from '../../store/tmdb/tmdb.selectors';
import { Observable } from 'rxjs';
import { QuestionnaireAnswers } from '../../models/questionnaire.model';
import { map, filter } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

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
  private shuffledMovies: any[] = [];

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
    });

    combineLatest([
      this.store.select(selectMovies),
      this.store.select(selectMoviesLoading)
    ]).pipe(
      filter(([movies, loading]) => {
      console.log('Filter check:', { movies, loading });
      return !loading;
      }),
      take(1)
    ).subscribe(([movies]) => {
      console.log('Movies loaded:', movies);
        // Shuffle the movies array
        if (movies) {
          this.shuffledMovies = movies.slice().sort(() => Math.random() - 0.5);
          this.movies$ = new Observable(observer => {
            observer.next(this.shuffledMovies);
            observer.complete();
          });
          this.recommendedMovie = this.shuffledMovies[0]?.title ?? 'Unknown';
          this.recommendedMovieDetails = this.shuffledMovies[0] ?? {};
          console.log('Movie successfully loaded:', this.recommendedMovieDetails);
          console.log('Movie successfully loaded:', this.recommendedMovieDetails);
        } else {
          console.log('No movies found...');
        }
    });
  }
  
  generateAnother = () => {
    if (!this.shuffledMovies.length) return;
    this.shuffledMovies.push(this.shuffledMovies.shift()!);
    this.recommendedMovie = this.shuffledMovies[0]?.title ?? 'Unknown';
    this.recommendedMovieDetails = this.shuffledMovies[0] ?? {};
  };

  getTranslatedAnswer(answers: any, key: string): string {
    const value = answers[key];
    if (!value || value.length === 0 || !value[0]) {
      return key;
    }
    if (Array.isArray(value)) {
      return value.map(val => this.translations[key]?.[val] ?? val).join(', ');
    }
    return this.translations[key]?.[value] ?? value;
  }

  getYearFromDate(date: string): string {
    return this.translationsService.getYear(date);
  }

  getTranslatedDateFromDate(date: string): string {
    return this.translationsService.getDate(date);
  }

  getTranslatedGenres(genreIds: string[]): string {
    return this.translationsService.getGenres(genreIds);
  }

  finish() {
    this.router.navigate(['/']);
  }
}
