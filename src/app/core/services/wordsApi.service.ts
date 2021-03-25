/* eslint-disable @typescript-eslint/lines-between-class-members */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWord } from '../interfaces/iword';

@Injectable({
  providedIn: 'root',
})
export class WordsApiService {
  private baseUrl = 'https://afternoon-falls-25894.herokuapp.com/words';
  private pageToken = '0';
  private groupToken = '0';
  private wordList = `${this.baseUrl}?page=${this.pageToken}&group=${this.groupToken}`;

  constructor(private http: HttpClient) {}

  getWordList(): Observable<IWord[]> {
    return this.http.get<IWord[]>(this.wordList);
  }

  // TODO: finish sorting (Second try)
  // .pipe(map((arr) => this.random(arr)));

  // random(arr: IWord[]): IWord[] {
  //   const newArr: IWord[] = [];
  //   const index = Math.floor(Math.random() * arr.length);
  //   let arrLength: number = arr.length;
  //   if (arrLength > 1) {
  //     newArr.push(arr[index]);
  //     arrLength -= 1;
  //   }
  //   return newArr;
  // }

  // TODO: finish sorting (First try)
  // .pipe(map((arr) => this.random(arr)));

  // random(arr: IWord[]): IWord[] {
  //   const newArr: IWord[] = [...arr];
  //   const index = Math.floor(Math.random() * arr.length);
  //   return newArr.map((el) => el[index]);
  // }

  changePageToken(passedPageToken: string): void {
    this.pageToken = passedPageToken;
  }

  changeGroupToken(passedGroupToken: string): void {
    this.groupToken = passedGroupToken;
  }
}
