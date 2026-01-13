import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsApiResponse } from '../models/NewsApiResponse';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NewsDataService {

  private readonly BASE_URL = environment.newsdataApi.url;
  private readonly API_KEY = environment.newsdataApi.apiKey;

  // static filters
  private readonly CATEGORIES =
    'breaking,business,education,politics,technology';

  constructor(private http: HttpClient) {}

  /**
   * Get latest news by country (dynamic)
   * Example: 'in', 'us', 'uk'
   */
  getLatestNewsByCountry(country: string): Observable<NewsApiResponse> {

    const params = new HttpParams()
      .set('apikey', this.API_KEY)
      .set('country', country)
      .set('category', this.CATEGORIES)
      .set('image', '1');

    return this.http.get<NewsApiResponse>(this.BASE_URL, { params });
  }
}
