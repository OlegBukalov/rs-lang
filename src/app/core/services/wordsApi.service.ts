/* eslint-disable @typescript-eslint/lines-between-class-members */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IWord } from '../interfaces/iword';

@Injectable({
  providedIn: 'root',
})
export class WordsApiService {
  private readonly baseUrl = 'https://afternoon-falls-25894.herokuapp.com/words';
  private pageToken = '0';
  private groupToken = '0';
  // TODO: not used yet
  // private id = '';
  // private wordList = `${this.baseUrl}?page=${this.pageToken}&group=${this.groupToken}`;

  constructor(private http: HttpClient) {}

  private get wordListUrl() {
    return `${this.baseUrl}?page=${this.pageToken}&group=${this.groupToken}`;
  }

  // TODO: not used yet
  // private get wordUrl() {
  //   return `${this.baseUrl}/${this.id}`;
  // }

  getWordList(): Observable<IWord[]> {
    return this.http.get<IWord[]>(this.wordListUrl).pipe(map((arr) => this.random(arr)));
  }

  // TODO: not used yet
  // getWord(): Observable<IWord[]> {
  //   return this.http.get<IWord[]>(this.wordUrl).pipe(map((arr) => arr));
  // }

  random(arr: IWord[]): IWord[] {
    const newArr: IWord[] = [];
    let arrLength: number = arr.length;
    while (arrLength > 0) {
      const index = Math.floor(Math.random() * arr.length);
      if (!newArr.includes(arr[index])) {
        newArr.push(arr[index]);
        arrLength -= 1;
      }
    }
    return newArr;
  }

  changePageToken(passedPageToken: string): void {
    this.pageToken = passedPageToken;
  }

  changeGroupToken(passedGroupToken: string): void {
    this.groupToken = passedGroupToken;
  }

  // TODO: not used yet
  // changeIDToken(passedIDToken: string): void {
  //   this.id = passedIDToken;
  // }
}
