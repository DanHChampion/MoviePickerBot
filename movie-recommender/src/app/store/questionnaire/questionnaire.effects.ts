import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { loadAnswers,loadAnswersSuccess, loadAnswersFailure } from './questionnaire.actions';

@Injectable()
export class QuestionnaireEffects {
    private actions$ = inject(Actions);

    loadAnswers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAnswers),
            mergeMap(() => {
                return of(loadAnswersSuccess({ answers: {} }));
            }),
            catchError(error => of(loadAnswersFailure({ error })))
        )
    );
}
