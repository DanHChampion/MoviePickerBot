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
  selector: 'app-question2',
  imports: [CommonModule, FormsModule, ButtonComponent, FormComponent],
  templateUrl: './question2.component.html',
  styleUrl: './question2.component.scss',
  standalone: true
})
export class Question2Component {
  options: string[] = [
    'No one, I\'m watching alone',
    'With my partner',
    'With my family',
    'With kids',
    'With my friends'
  ];
  selectedCompany: string= '';

  constructor(private store: Store<AppState>, private router: Router) {}

  onSubmit() {
    if (this.selectedCompany) {
      this.store.dispatch(saveAnswer({ questionId: 'company', answer: this.selectedCompany }));
      this.router.navigate(['/question3']);
    }
  }
}
