export interface QuestionnaireAnswers {
  genres: string[];      // e.g. 'action','comedy'
  runtime: string;       // in minutes, e.g. 120
  company: string;       // e.g. 'alone', 'with friends', 'with family'
  releaseYear: string;  // optional, e.g. '2020'
  popularity: string;   // e.g. 'popular', 'hidden_gem'
}