import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
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
export class TextBookGroupComponent {
  groupId: number;

  cards: IWord[];

  currentColor: string;

  urlFragment = /(?<=group\/)\d+/;

  difficulties: IGroupCategory[] = categories;

  variable: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wordsApiService: WordsApiService,
    private storage: StorageService,
  ) {
    this.route.params.subscribe((params) => {
      const id = IdValidatorService.validate(params.groupId);
      if (!this.isGroupChanged(id)) {
        this.changeGroupToken(id);
        this.updateColor();
        return;
      }
      this.updateCards(id);
      this.updateColor();
      this.storage.setItem('groupId', id.toString());
    });
  }

  isGroupChanged(id: number): boolean {
    const storageId = +this.storage.getItem('groupId');
    const groupId = this.groupId ? this.groupId : storageId;
    return groupId !== id;
  }

  changeGroupToken(groupId: number) {
    this.groupId = groupId;
    this.wordsApiService.changeGroupToken(this.groupId.toString());
  }

  updateCards(groupId: number) {
    this.changeGroupToken(groupId);
    const result = this.wordsApiService.getWordList().pipe(first());
    result.subscribe((cards) => {
      this.cards = cards;
    });
  }

  updateColor() {
    this.currentColor = this.difficulties.find((diff) => diff.groupId === this.groupId).color;
  }

  navigate(groupId: number) {
    this.router.navigateByUrl(this.router.url.replace(this.urlFragment, groupId.toString()));
  }
}
