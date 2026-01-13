import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RssService {

  constructor(private http: HttpClient) {}

  getRssFeed(url: string): Observable<any[]> {
    return this.http.get<any>(url).pipe(
      map(res => res.items || [])
    );
  }
}
