export interface TMDBFilterParams {
  with_genres?: string;
  'primary_release_date.gte'?: string; // e.g. 2020
  'with_runtime.gte'?: number;
  'with_runtime.lte'?: number;
  sort_by?: string; // e.g. 'popularity.desc', 'release_date.desc'
  'certification_country'?: string; // e.g. 'GB'
  'certification.gte'?: string; // e.g. 'G', 'PG-13'
  'certification.lte'?: string; // e.g. 'PG-13', 'R'
  include_adult?: boolean; // true or false
  page?: number; // for pagination
}

export interface RecommendedMovieDetails {
  title: string;
  release_date: string;
  overview: string;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  vote_average: number;
  poster_path: string;
}
  
