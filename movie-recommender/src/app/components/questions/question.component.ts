import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { saveAnswer } from '../../state/app.actions';
import { AppState } from '../../state/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../common/button/button.component';
import { FormComponent } from '../common/form/form.component';

interface Question {
	id: number;
	name: string;
	title: string;
	options: string[];
	type: 'single' | 'multiple';
}

interface Answers {
	// blank
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

	allQuestions: Question[] = [
		{
			id: 0,
			name: 'genres',
			title: 'Which movie genre(s) do you enjoy the most?',
			options: [
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
				'History'],
			type: 'multiple'
		},
		{
			id: 1,
			name: 'company',
			title: 'Who are you watching with?',
			options: [
				'No one, I\'m watching alone',
				'With my partner',
				'With my family',
				'With kids',
				'With my friends'
			],
			type: 'single'
		},
		{
			id: 2,
			name: 'runtime',
			title: 'What is your preferred movie length?',
			options: [
				'Short (less than 90 minutes)',
				'Medium (90-120 minutes)',
				'Long (over 120 minutes)',
				'No preference'
			],
			type: 'single'
		},
		{
			id: 3,
			name: 'releaseYear',
			title: 'How old would you like the movie to be?',
			options: [
				'Last 5 years',
				'Last 10 years',
				'Last 25 years',
				'No preference'
			],
			type: 'single'
		},
		{
			id: 4,
			name: 'popular',
			title: 'Would you like to watch a more popular movie or a hidden gem?',
			options: [
				'Popular movie',
				'Hidden gem',
				'No preference'
			],
			type: 'single'
		},
	];

	question: Question = this.allQuestions[0];
	selectedOptions: string[] = [];
	selectedOption: string = '';


	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private store: Store<{ answers: any }>,
	) {

		this.route.paramMap.subscribe((params) => {
			this.questionIndex = +params.get('id')!;
			this.question = this.allQuestions[this.questionIndex];
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
