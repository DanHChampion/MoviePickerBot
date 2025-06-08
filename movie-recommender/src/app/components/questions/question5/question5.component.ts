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
  selector: 'app-question5',
  imports: [CommonModule, FormsModule, ButtonComponent, FormComponent],
  templateUrl: './question5.component.html',
  styleUrl: './question5.component.scss',
  standalone: true
})
export class Question5Component {
  options: string[] = ['Popular movie', 'Hidden gem', 'No preference'];
  selectedPopularity: string = '';

  constructor(private store: Store<AppState>, private router: Router) {}

  onSubmit() {
    if (this.selectedPopularity) {
      this.store.dispatch(saveAnswer({ questionId: 'popularity', answer: this.selectedPopularity }));
      this.router.navigate(['/results']);
    }
  }
}
