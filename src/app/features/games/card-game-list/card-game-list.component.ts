import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IWord } from 'src/app/core/interfaces/iword';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';

@Component({
  selector: 'app-card-game-list',
  templateUrl: './card-game-list.component.html',
  styleUrls: ['./card-game-list.component.scss'],
  providers: [WordsApiService],
})
export class CardGameListComponent implements OnInit {
  allWords: Observable<IWord[]>;

  constructor(private wordsApiService: WordsApiService) {}

  ngOnInit() {
    this.allWords = this.wordsApiService.getData();
  }
}

// .subscribe((data: IWord[]) => {
//   this.allWords = data;
// });
