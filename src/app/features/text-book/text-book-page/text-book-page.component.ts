import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, first } from 'rxjs/operators';
import { IPaginationOptions } from 'src/app/core/interfaces/ipagination-options';
import { IWord } from 'src/app/core/interfaces/iword';
import { StorageService } from 'src/app/core/services/storage.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';
import { IGameItem } from '../../../core/interfaces/igame-item';
import { GAMES_DESCRIPTION } from '../../games/data-game-description';
import { IdValidatorService } from '../id-validator.service';

const FIRST_PAGE_INDEX = 0;
const LAST_PAGE_INDEX = 29;

@Component({
  selector: 'app-text-book-page',
  templateUrl: './text-book-page.component.html',
  styleUrls: ['./text-book-page.component.scss'],
})
export class TextBookPageComponent {
  games: IGameItem[] = GAMES_DESCRIPTION;

  pageId: number;

  @Input() color: string;

  @Input() cards: IWord[];

  paginationOptions: IPaginationOptions = {
    firstPageIndex: FIRST_PAGE_INDEX,
    lastPageIndex: LAST_PAGE_INDEX,
    UrlFragment: /(?<=page\/)\d+/,
  };

  @Input() isLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wordsApiService: WordsApiService,
    private storage: StorageService,
    private toaster: ToasterService,
  ) {
    this.route.params.subscribe((params) => {
      const id = IdValidatorService.validate(params.pageId);
      if (!this.isPageChanged(id)) return;
      this.updateCards(id);
      this.storage.setItem('pageId', id.toString());
    });
  }

  isPageChanged(id: number) {
    return this.pageId !== id;
  }

  updateCards(pageId: number) {
    this.isLoading = true;
    this.pageId = pageId;
    this.wordsApiService.changePageToken(this.pageId.toString());
    const result = this.wordsApiService.getWordList().pipe(
      first(),
      finalize(() => {
        this.isLoading = false;
      }),
    );
    result.subscribe(
      (cards) => {
        this.cards = cards;
      },
      () => {
        this.cards = [];
        this.toaster.showError('Не удалось загрузить слова', 'Ошибка!');
      },
    );
  }

  navigate(pageId: number) {
    if (
      pageId < this.paginationOptions.firstPageIndex ||
      pageId > this.paginationOptions.lastPageIndex
    )
      return;

    this.router.navigateByUrl(
      this.router.url.replace(this.paginationOptions.UrlFragment, pageId.toString()),
    );
  }
}
