import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IWord } from 'src/app/core/interfaces/iword';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';
import { difficulties, IGroupDifficulty } from './group-difficulty';

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

  difficulties: IGroupDifficulty[] = difficulties;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wordsApiService: WordsApiService,
  ) {
    this.route.params.subscribe((params) => {
      const id = this.validateId(params.groupId);
      this.updateCards(id);
      this.updateColor();
    });
  }

  ngOnInit(): void {
    this.wordsApiService.changeGroupToken(this.groupId.toString());
  }

  validateId(id: any): number {
    return !id || Number.isNaN(+id) ? 0 : id;
  }

  updateCards(groupId: number) {
    this.groupId = groupId;
    this.wordsApiService.changeGroupToken(this.groupId.toString());
    this.cards = this.wordsApiService.getWordList();
  }

  updateColor() {
    this.currentColor = this.difficulties.find((diff) => diff.groupId === +this.groupId).color;
  }

  navigate(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const element = target.closest('.difficulty') as HTMLElement;
    const id = element.getAttribute('id');

    this.router.navigateByUrl(this.router.url.replace(this.urlFragment, id));
  }
}
