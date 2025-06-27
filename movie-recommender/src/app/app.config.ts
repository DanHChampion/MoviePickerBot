import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { reducers } from './store/app.reducers';
import { QuestionnaireEffects } from './store/questionnaire/questionnaire.effects';
import { TmdbEffects } from './store/tmdb/tmdb.effects';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),

    provideStore(reducers),
    provideEffects([QuestionnaireEffects, TmdbEffects]),
    provideStoreDevtools({ maxAge: 25 }),
  ],
};
