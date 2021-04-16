import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IWord } from 'src/app/core/interfaces/iword';
import { StorageService } from 'src/app/core/services/storage.service';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';
import { IdValidatorService } from '../id-validator.service';
import { categories, IGroupCategory } from './group-difficulty';

@Component({
  selector: 'app-text-book-group',
  templateUrl: './text-book-group.component.html',
  styleUrls: ['./text-book-group.component.scss'],
})
export class TextBookGroupComponent implements OnInit {
  groupId: number;

  cards: Observable<IWord[]>;

  currentColor: string;

  urlFragment = /(?<=group\/)\d+/;

  difficulties: IGroupCategory[] = categories;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wordsApiService: WordsApiService,
    private storage: StorageService,
  ) {
    this.route.params.subscribe((params) => {
      const id = IdValidatorService.validate(params.groupId);
      this.updateCards(id);
      this.updateColor();
      this.storage.setItem('groupId', id.toString());
    });
  }

  ngOnInit(): void {
    this.wordsApiService.changeGroupToken(this.groupId.toString());
  }

  updateCards(groupId: number) {
    this.groupId = groupId;
    this.wordsApiService.changeGroupToken(this.groupId.toString());
    this.cards = this.wordsApiService.getWordList();
  }

  updateColor() {
    this.currentColor = this.difficulties.find((diff) => diff.groupId === this.groupId).color;
  }

  navigate(groupId: number) {
    this.router.navigateByUrl(this.router.url.replace(this.urlFragment, groupId.toString()));
  }
}
