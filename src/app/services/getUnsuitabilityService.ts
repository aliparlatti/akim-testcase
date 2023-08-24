import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Unsuitability } from '../models/unsuitability';

@Injectable({ providedIn: 'root' })
export class UnsuitabilityService {
  constructor(private http: HttpClient) {}

  getUnsuitability(): Observable<Unsuitability[]> {
    return this.http.get<Unsuitability>('assets/data/unsuitability.json').pipe(
      map((res) => res['data'] as Unsuitability[]),
      catchError((error) => {
        console.error('Hata oluştu:', error);
        throw error;
      })
    );
  }
}
