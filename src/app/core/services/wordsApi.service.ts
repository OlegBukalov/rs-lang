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

  private baseUrl = 'https://afternoon-falls-25894.herokuapp.com/words';

  private pageToken = '0';

  private groupToken = '0';

  private wordList = `${this.baseUrl}?page=${this.pageToken}&group=${this.groupToken}`;

  getWordList(): Observable<IWord[]> {
    return this.http.get<IBaseWord[]>(this.wordList).pipe(
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

  changePageToken(passedPageToken: string): void {
    this.pageToken = passedPageToken;
  }

  changeGroupToken(passedGroupToken: string): void {
    this.groupToken = passedGroupToken;
  }
}
