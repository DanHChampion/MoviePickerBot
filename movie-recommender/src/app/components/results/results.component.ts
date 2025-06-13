import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/app/app.reducer';
import { ButtonComponent } from '../common/button/button.component';
import { loadMovies } from '../../store/tmdb/tmdb.actions';
import { TranslationsService } from '../../services/translations.service';

@Component({
  selector: 'app-results',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
  standalone: true
})
export class ResultsComponent {
  answers$: Observable<{ [key: string]: string }>;
  answerKeys: string[] = [];
  recommendedMovie = 'Inception (2010)'; // Keep this simple/hardcoded for now

  public translations: any;

  constructor(private store: Store<AppState>, private router: Router, 
    private translationsService: TranslationsService) {
    this.answers$ = this.store.pipe(select(state => state.questionnaire.answers));
    this.answers$.subscribe(answers => {
      this.answerKeys = answers ? Object.keys(answers) : [];
    });

    this.translations = this.translationsService.labels;
  };

  ngOnInit() {
    this.answers$.subscribe(answers => {
      const redirectToHome = Object.keys(answers).length !== 5;
      if (redirectToHome) {
        this.router.navigate(['/']);
        return;
      }
      this.store.dispatch(loadMovies({
        answers: {
          genres: Array.isArray(answers['genres']) ? answers['genres'] : (answers['genres'] ? [answers['genres']] : []),
          runtime: answers['runtime'] || '',
          company: answers['company'] || '',
          releaseYear: answers['releaseYear'] || '',
          popularity: answers['popularity'] || ''
        }
      }));
    });

    this.store.select(state => state.tmdb.movies).subscribe(movies => {
      console.log('Recommended movies:', movies);
    });
  }

  finish() {
    this.router.navigate(['/']);
  };
}
