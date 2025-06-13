export interface TMDBFilterParams {
  with_genres?: string;
  primary_release_date_gte?: string; // e.g. 2020
  with_runtime_gte?: number;
  with_runtime_lte?: number;
  sort_by?: string; // e.g. 'popularity.desc', 'release_date.desc'
  certification_gte?: string; // e.g. 'G', 'PG-13'
  certification_lte?: string; // e.g. 'PG-13', 'R'
}
