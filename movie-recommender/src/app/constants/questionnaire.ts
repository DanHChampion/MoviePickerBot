import { LABELS } from "./translations/en-GB";

interface Question {
	id: number;
	name: string;
	title: string;
	options: string[];
	type: 'single' | 'multiple';
}

export const QUESTIONNAIRE: Question[] = [
{
    id: 0,
    name: 'genres',
    title: 'Which movie genre(s) do you enjoy the most?',
    options: Object.keys(LABELS.genres),
    type: 'multiple'
},
{
    id: 1,
    name: 'company',
    title: 'Who are you watching with?',
    options: Object.keys(LABELS.company),
    type: 'single'
},
{
    id: 2,
    name: 'runtime',
    title: 'What is your preferred movie length?',
    options: Object.keys(LABELS.runtime),
    type: 'single'
},
{
    id: 3,
    name: 'releaseYear',
    title: 'How old would you like the movie to be?',
    options: Object.keys(LABELS.releaseYear),
    type: 'single'
},
{
    id: 4,
    name: 'popularity',
    title: 'Would you like to watch a more popular movie or a hidden gem?',
    options: Object.keys(LABELS.popularity),
    type: 'single'
},
];