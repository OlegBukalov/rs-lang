import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IWord } from 'src/app/core/interfaces/iword';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';

@Component({
  selector: 'app-text-book-group',
  templateUrl: './text-book-group.component.html',
  styleUrls: ['./text-book-group.component.scss'],
})
export class TextBookGroupComponent implements OnInit {
  groupId: number;
  pageId: number;

  words: Observable<IWord[]>;

  constructor(private route: ActivatedRoute, private wordsApiService: WordsApiService) {
      this.groupId = this.route.snapshot.params["groupId"];
      this.pageId = this.route.snapshot.params["pageId"];
  }

  ngOnInit(): void {
    this.wordsApiService.changeGroupToken(this.groupId.toString());
    this.wordsApiService.changePageToken(this.pageId.toString());
    this.words = this.wordsApiService.getWordList();
  }
}
