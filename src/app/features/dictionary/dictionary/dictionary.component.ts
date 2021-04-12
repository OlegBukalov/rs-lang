import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { finalize, first } from 'rxjs/operators';
import { IWord } from 'src/app/core/interfaces/iword';
import { DictionaryService } from 'src/app/core/services/dictionary.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { DEFAULT_CATEGORY, DictionaryCategory } from '../dictionary-category';

const PAGINATION_ARRAY = [6, 12, 26, 50, 100];

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
})
export class DictionaryComponent implements OnInit {
  currentCategory: DictionaryCategory = DEFAULT_CATEGORY;

  cards: IWord[];

  pageSizeOptions: number[] = PAGINATION_ARRAY;

  pageSize: number = PAGINATION_ARRAY[0];

  isLoading: boolean;

  pageLeftIndex = 0;

  pageRightIndex: number = this.pageSize;

  get categories(): string[] {
    return Object.values(DictionaryCategory).filter((key) => Number.isNaN(+key));
  }

  constructor(private dictionarySevice: DictionaryService, private toaster: ToasterService) {}

  ngOnInit() {
    this.updateCategoryWords();
    this.pageSize = this.pageSizeOptions[0];
  }

  selectCurrentCategory(categoryName: string) {
    const categoryKey = Object.keys(DictionaryCategory).find((key) => {
      const category = DictionaryCategory[key] as DictionaryCategory;
      return category.toString() === categoryName;
    });
    this.currentCategory = DictionaryCategory[categoryKey];
    this.updateCategoryWords();
  }

  updateCategoryWords() {
    this.isLoading = true;
    const result = this.dictionarySevice.getAggregatedWords(this.currentCategory).pipe(first(),
      finalize(() => {
        this.isLoading = false
      })
    );
    result.subscribe(
      (pages) => {
        const [page] = pages;
        this.cards = page.paginatedResults;
      },
      () => {
        this.cards = [];
        this.toaster.showError('Не удалось загрузить слова', 'Ошибка!');
      },
    );
  }

  handlePage(event: PageEvent) {
    this.pageLeftIndex = event.pageIndex * event.pageSize;
    this.pageRightIndex = this.pageLeftIndex + event.pageSize;
  }
}
