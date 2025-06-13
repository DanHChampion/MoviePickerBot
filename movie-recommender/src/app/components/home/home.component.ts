import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app/app.reducer';
import { ButtonComponent } from '../common/button/button.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {
  answers$: Observable<{ [key: string]: string }>;
  answerKeys: string[] = [];
  recommendedMovie = 'Inception (2010)';

  constructor(private router: Router, private store: Store<AppState>) {
    this.answers$ = this.store.pipe(select(state => state.questionnaire.answers));
    this.answers$.subscribe(answers => {
      this.answerKeys = answers ? Object.keys(answers) : [];
    });
  }

  startQuestionnaire() {
    this.router.navigate(['/question/0']);
  }
}
