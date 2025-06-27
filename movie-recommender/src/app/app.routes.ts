import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuestionPageComponent } from './components/questions/question.component';
import { ResultsComponent } from './components/results/results.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'question/:id', component: QuestionPageComponent},
  { path: 'results', component: ResultsComponent },
];
