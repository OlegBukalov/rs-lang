import { Component, OnInit } from '@angular/core';
import { IWordPage } from 'src/app/core/interfaces/iword-page';
import { DictionaryService } from 'src/app/core/services/dictionary.service';
import { DEFAULT_CATEGORY, DictionaryCategory } from '../dictionary-category';

const PAGINATION_ARRAY = [5, 10, 25, 50, 100];

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
})
export class DictionaryComponent implements OnInit {
  currentCategory: DictionaryCategory = DEFAULT_CATEGORY;

  wordPages: IWordPage[];

  paginationArray = PAGINATION_ARRAY;

  wordsPerPage: number;

  isLoading: boolean;

  get categories(): string[] {
    return Object.values(DictionaryCategory);
  }

  // TODO: пагинация
  constructor(private dictionarySevice: DictionaryService) {}

  ngOnInit() {
    this.updateCategoryWords();
    [this.wordsPerPage] = this.paginationArray;
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
    this.dictionarySevice.getAggregatedWords(this.currentCategory).subscribe((result) => {
      this.wordPages = result;
      this.isLoading = false;
    });
  }

  setWordsPerPageCount(count: number) {
    this.dictionarySevice.setWordsPerPageCount(count);
  }
}
