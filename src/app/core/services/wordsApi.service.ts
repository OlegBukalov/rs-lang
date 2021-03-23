import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBaseWord, IWord } from '../interfaces/iword';

@Injectable({
  providedIn: 'root',
})
export class WordsApiService {
  constructor(private http: HttpClient) {}

  getData(): Observable<IWord[]> {
    return this.http
      .get<IBaseWord[]>('https://afternoon-falls-25894.herokuapp.com/words?page=2&group=0')
      .pipe(
        map((word) => {
          // eslint-disable-next-line @typescript-eslint/unbound-method
          return word.map(this.transformBaseWordToWord);
        }),
      );
  }

  private transformBaseWordToWord(baseWord: IBaseWord): IWord {
    return {
      ...baseWord,
    };
  }
}
