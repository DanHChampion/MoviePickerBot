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
  selector: 'app-question4',
  imports: [CommonModule, FormsModule, ButtonComponent, FormComponent],
  templateUrl: './question4.component.html',
  styleUrl: './question4.component.scss',
  standalone: true
})
export class Question4Component {
  options: string[] = ['Last 5 years', 'Last 10 years', 'Last 25 years', 'No preference'];
  selectedReleasedYear: string = '';

  constructor(private store: Store<AppState>, private router: Router) {}

  onSubmit() {
    if (this.selectedReleasedYear) {
      this.store.dispatch(saveAnswer({ questionId: 'releasedYear', answer: this.selectedReleasedYear }));
      this.router.navigate(['/question5']);
    }
  }
}
