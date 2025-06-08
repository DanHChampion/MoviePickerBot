import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { saveAnswer } from '../../../state/app.actions';
import { AppState } from '../../../state/app.reducer';
import { ButtonComponent } from '../../common/button/button.component';
import { FormComponent } from '../../common/form/form.component';

@Component({
  selector: 'app-question1',
  imports: [CommonModule, FormsModule, ButtonComponent, FormComponent],
  templateUrl: './question1.component.html',
  styleUrl: './question1.component.scss',
  standalone: true
})
export class Question1Component {
  options: string[] = [
    'Action',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Sci-Fi',
    'Romance',
    'Thriller',
    'Documentary',
    'Animation',
    'Adventure',
    'Mystery',
    'Crime',
    'Family',
    'Music',
    'War',
    'Western',
    'History'];
  selectedGenres: string[] = [];

  constructor(private store: Store<AppState>, private router: Router) {}

  onSubmit() {
    if (this.selectedGenres) {
      this.store.dispatch(saveAnswer({ questionId: 'genres', answer: this.selectedGenres }));
      this.router.navigate(['/question2']);
    }
  }
}
