import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPaginationOptions } from 'src/app/core/interfaces/ipagination-options';
import { IWord } from 'src/app/core/interfaces/iword';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';

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
    firstPageIndex: 0,
    lastPageIndex: 29,
    UrlFragment: /(?<=page\/)\d+/,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wordsApiService: WordsApiService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = this.validateId(params.pageId);
      this.updateCards(id);
    });
  }

  validateId(id: any): number {
    return !id || Number.isNaN(+id) ? 0 : id;
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
