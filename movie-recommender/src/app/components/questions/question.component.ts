import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { saveAnswer } from '../../store/questionnaire/questionnaire.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../common/button/button.component';
import { FormComponent } from '../common/form/form.component';
import { QUESTIONNAIRE } from '../../constants/questionnaire';
import { take } from 'rxjs';

interface Question {
	id: number;
	name: string;
	title: string;
	options: string[];
	type: 'single' | 'multiple';
}

@Component({
	selector: 'app-question-page',
	imports: [CommonModule, FormsModule, ButtonComponent, FormComponent],
	templateUrl: './question.component.html',
	styleUrl: './question.component.scss',
	standalone: true
})
export class QuestionPageComponent {
	questionIndex: number = 0;

	allQuestions: Question[] = QUESTIONNAIRE;

	question: Question = this.allQuestions[0];
	selectedOptions: string[] = [];
	selectedOption: string = '';


	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private store: Store<{ questionnaire: { answers: any } }>,
	) {
		this.route.paramMap.subscribe((params) => {
			this.questionIndex = +params.get('id')!;
			this.question = this.allQuestions[this.questionIndex];

			this.store.select(state => state.questionnaire.answers).pipe(take(1)).subscribe(answers => {
				const isEmpty = Object.keys(answers).length === 0;
				if (isEmpty && this.questionIndex > 0) {
					this.router.navigate(['/']);
				}
			});
		});
	}

	onSelectedChange(value: string | string[]) {
		if (this.question.type === 'multiple') {
			this.selectedOptions = value as string[];
		} else {
			this.selectedOption = value as string;
		}
	}

	onSubmit() {
		if (this.selectedOptions.length > 0 || this.selectedOption) {
			const answer = this.question.type === 'multiple' ? this.selectedOptions : this.selectedOption;
			this.store.dispatch(saveAnswer({ questionId: this.question.name, answer }));
			if (this.questionIndex + 1 < this.allQuestions.length) {
				this.router.navigate(['/question', this.questionIndex + 1]);
			} else {
				this.router.navigate(['/results']);
			}
			this.selectedOptions = [];
			this.selectedOption = '';
		}
	}
}
