import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { QuestionnaireState } from "./questionnaire.reducer";

export const selectQuestionnaireState = (state: AppState) => state.questionnaire;
export const selectAnswers = createSelector(
    selectQuestionnaireState,
    (state: QuestionnaireState) => state.answers
);
