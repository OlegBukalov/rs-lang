import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  get categories(): string[] {
    return Object.keys(DictionaryCategory).filter((key) => Number.isNaN(+key));
  }

  // TODO: пагинация
  constructor(private dictionarySevice: DictionaryService) {}

  ngOnInit() {
    this.updateCategoryWords();
    this.wordsPerPage = 5;
  }

  selectCurrentCategory(categoryName: string) {
    this.currentCategory = DictionaryCategory[categoryName];
    this.updateCategoryWords();
  }

  updateCategoryWords() {
    let wordPages: Observable<IWordPage[]>;
    switch (this.currentCategory) {
      case DictionaryCategory['Изучаемые']:
        wordPages = this.dictionarySevice.getStudiedWords();
        break;
      case DictionaryCategory['Сложные']:
        wordPages = this.dictionarySevice.getHardWords();
        break;
      case DictionaryCategory['Удаленные']:
        wordPages = this.dictionarySevice.getDeletedWords();
        break;
      default:
        break;
    }
    wordPages.subscribe((result) => {
      this.wordPages = result;
    });
  }

  setWordsPerPageCount(count: number) {
    this.dictionarySevice.setWordsPerPageCount(count);
  }
}
