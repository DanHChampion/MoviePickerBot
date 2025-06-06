# MovieRecommender
Movie Recommender using TMDB API and Angular 2.0

To meet my goal of learning **Angular at a beginner-to-mid level**, including **NgRx**, let's align your **Movie Recommender App** to use the key Angular features below:

## ✅ Requirements Recap

| Feature                   | Included? | Notes                                                             |
| ------------------------- | --------- | ----------------------------------------------------------------- |
| ✅ Components              | ✔️        | Each question is its own component; result/dashboard too          |
| ✅ Templates               | ✔️        | Template-driven view for each component with reactive forms       |
| ✅ Services                | ✔️        | `MovieService` and `AnswerService` handle data and business logic |
| ✅ NgRx (State Management) | ✔️        | Stores answers, progress, and recommendation results              |
| ✅ Routing                 | ✔️        | Multi-page app using Angular Router                               |
| ✅ Reactive Forms          | ✔️        | Each question page uses a reactive form                           |
| ✅ No authentication       | ✔️        | Entire app runs locally with no login needed                      |

---

## 🧠 Revised Architecture With **NgRx**

We’ll use NgRx to store:

1. **User Answers** (genre, mood, era, etc.)
2. **Questionnaire Progress** (which question the user is on)
3. **Recommendations** (generated from mock API)

---

### 🗂 Suggested Folder Structure With NgRx

```
src/app/
├── components/
│   ├── dashboard/
│   ├── questions/
│   │   ├── question1/
│   │   └── question5/
│   ├── result/
├── store/
│   ├── answers/
│   │   ├── actions.ts
│   │   ├── reducer.ts
│   │   ├── selectors.ts
│   │   └── models.ts
│   ├── recommendations/
│   │   ├── actions.ts
│   │   ├── effects.ts
│   │   ├── reducer.ts
├── services/
│   └── movie.service.ts
├── app-routing.module.ts
```

---

## 🔄 Sample NgRx State

### `answers.actions.ts`

```ts
export const setAnswer = createAction(
  '[Questionnaire] Set Answer',
  props<{ questionKey: string, value: any }>()
);

export const resetAnswers = createAction('[Questionnaire] Reset');
```

### `answers.reducer.ts`

```ts
export interface AnswersState {
  [key: string]: any;
}

export const initialState: AnswersState = {};

export const answersReducer = createReducer(
  initialState,
  on(setAnswer, (state, { questionKey, value }) => ({
    ...state,
    [questionKey]: value
  })),
  on(resetAnswers, () => initialState)
);
```

---

## 🧩 Component + Store Example: Question 2

```ts
this.form = this.fb.group({ mood: ['', Validators.required] });

onSubmit() {
  if (this.form.valid) {
    this.store.dispatch(setAnswer({ questionKey: 'mood', value: this.form.value.mood }));
    this.router.navigate(['/question/3']);
  }
}
```

---

## 🎥 Recommendations via NgRx + Effects

In `recommendations.effects.ts`:

```ts
loadRecommendations$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadRecommendations),
    withLatestFrom(this.store.select(selectAnswers)),
    map(([_, answers]) => {
      const recs = this.movieService.getRecommendations(answers);
      return loadRecommendationsSuccess({ recommendations: recs });
    })
  )
);
```

---

## 🧪 Mock Recommendation Logic in `movie.service.ts`

```ts
getRecommendations(answers: AnswersState): Movie[] {
  return MOCK_MOVIES.filter(m =>
    m.genre === answers.genre &&
    m.mood.includes(answers.mood) &&
    m.era === answers.era
  ).slice(0, 3);
}
```

---

## 🔁 Result Page Flow

1. Dispatch `loadRecommendations()`
2. `NgRx effect` loads recommendations from service
3. Store `recommendations` in state
4. Display them in template using selector
5. “Finish” button resets state and navigates home

---

## ✅ Learning Goals You’ll Hit

| Angular Concept   | Where It's Used                           |
| ----------------- | ----------------------------------------- |
| Components        | Question screens, result, dashboard       |
| Services          | `movie.service.ts` and optional helpers   |
| NgRx Store        | Stores answers and recommendation results |
| NgRx Effects      | For generating movie recommendations      |
| Reactive Forms    | Each question page                        |
| Routing           | Multi-step navigation                     |
| Template Binding  | Dashboard and result display              |
| Optional CSS Anim | Loading states, transitions               |

