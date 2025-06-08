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
  selector: 'app-question3',
  imports: [CommonModule, FormsModule, ButtonComponent, FormComponent],
  templateUrl: './question3.component.html',
  styleUrl: './question3.component.scss',
  standalone: true
})
export class Question3Component {
  options: string[] = [
    'Short (less than 90 minutes)',
    'Medium (90-120 minutes)',
    'Long (over 120 minutes)',
    'No preference'
  ];
  selectedLength: string = '';

  constructor(private store: Store<AppState>, private router: Router) {}

  onSubmit() {
    if (this.selectedLength) {
      this.store.dispatch(saveAnswer({ questionId: 'length', answer: this.selectedLength }));
      this.router.navigate(['/question4']);
    }
  }
}
