import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private API_KEY = 'YOUR_TMDB_API_KEY';
//   private BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
  private BASE_URL = 'no';


  constructor(private http: HttpClient) {}

  discoverMovies(filters: any): Observable<any> {
    let params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', 'en-US');

    for (const key in filters) {
      if (filters[key]) {
        params = params.set(key, filters[key]);
        console.log(`Setting filter: ${key} = ${filters[key]}`);
      }
    }
    
    return this.http.get(this.BASE_URL, { params });
  }
}
