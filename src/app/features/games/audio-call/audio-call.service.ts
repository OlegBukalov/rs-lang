import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWord } from 'src/app/core/interfaces/iword';

@Injectable({
  providedIn: 'root',
})
export class AudioCallService {
  private baseUrl = `https://afternoon-falls-25894.herokuapp.com/words`;

  constructor(private http: HttpClient) {}

  getWords(level: number, page: number): Observable<IWord[]> {
    return this.http.get<IWord[]>(this.baseUrl, { params: { group: `${level}`, page: `${page}` } });
  }
}
