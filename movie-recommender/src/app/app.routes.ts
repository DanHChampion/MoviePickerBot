import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Question1Component } from './components/questions/question1/question1.component';
import { Question2Component } from './components/questions/question2/question2.component';
import { Question3Component } from './components/questions/question3/question3.component';
import { Question4Component } from './components/questions/question4/question4.component';
import { Question5Component } from './components/questions/question5/question5.component';
import { ResultsComponent } from './components/results/results.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'question1', component: Question1Component },
  { path: 'question2', component: Question2Component },
  { path: 'question3', component: Question3Component },
  { path: 'question4', component: Question4Component },
  { path: 'question5', component: Question5Component },
  { path: 'results', component: ResultsComponent },
  // Add other question routes here
];
