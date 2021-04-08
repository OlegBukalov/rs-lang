import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPaginationOptions } from 'src/app/core/interfaces/ipagination-options';
import { IWord } from 'src/app/core/interfaces/iword';
import { StorageService } from 'src/app/core/services/storage.service';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';
import { IdValidatorService } from '../id-validator.service';

const FIRST_PAGE_INDEX = 0;
const LAST_PAGE_INDEX = 29;

@Component({
  selector: 'app-text-book-page',
  templateUrl: './text-book-page.component.html',
  styleUrls: ['./text-book-page.component.scss'],
})
export class TextBookPageComponent implements OnInit {
  pageId: number;

  @Input() color: string;

  @Input() cards: Observable<IWord[]>;

  paginationOptions: IPaginationOptions = {
    firstPageIndex: FIRST_PAGE_INDEX,
    lastPageIndex: LAST_PAGE_INDEX,
    UrlFragment: /(?<=page\/)\d+/,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wordsApiService: WordsApiService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = IdValidatorService.validate(params.pageId);
      this.updateCards(id);
      this.storage.setItem('pageId',id.toString());
    });
  }

  updateCards(pageId: number) {
    this.pageId = pageId;
    this.wordsApiService.changePageToken(this.pageId.toString());
    this.cards = this.wordsApiService.getWordList();
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
