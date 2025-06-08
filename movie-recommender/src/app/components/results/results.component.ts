import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../state/app.reducer';
import { ButtonComponent } from '../common/button/button.component';

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

  constructor(private store: Store<AppState>, private router: Router) {
    this.answers$ = this.store.pipe(select(state => state.questionnaire.answers));
    this.answers$.subscribe(answers => {
      this.answerKeys = answers ? Object.keys(answers) : [];
    });
  }

  finish() {
    this.router.navigate(['/']);
  }
}
