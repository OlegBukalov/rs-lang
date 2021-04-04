import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AudioCallService {
  baseURL = 'https://afternoon-falls-25894.herokuapp.com/words';

  constructor(private http: HttpClient) {}

  getWords(level) {
    return this.http.get(this.baseURL, { params: { group: level } });
  }
}
