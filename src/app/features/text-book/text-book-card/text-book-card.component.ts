import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IWord } from 'src/app/core/interfaces/iword';
import { DictionaryService } from 'src/app/core/services/dictionary.service';
import { DictionaryCategory } from '../../dictionary/dictionary-category';
import { namesByCategory } from '../../dictionary/name-by-category';
import { ITextBookSettings } from '../../settings/interfaces/itext-book-settings';
import { TextBookSettingsService } from '../../settings/services/text-book-settings.service';

@Component({
  selector: 'app-text-book-card',
  templateUrl: './text-book-card.component.html',
  styleUrls: ['./text-book-card.component.scss'],
})
export class TextBookCardComponent {
  @Input() card: IWord;

  @Input() color: string;

  @Output() cardCategoryChanged = new EventEmitter<void>();

  @ViewChild('image') image: ElementRef;

  settings: ITextBookSettings = this.textBookSettingsService.getSettings();

  hardCategory = namesByCategory[DictionaryCategory.Hard];

  Category = DictionaryCategory;

  constructor(
    private textBookSettingsService: TextBookSettingsService,
    private dictionaryService: DictionaryService,
  ) {}

  showImage() {
    const image = this.image.nativeElement as HTMLImageElement;
    image.style.display = 'block';
  }

  async moveCard(category: DictionaryCategory, event: MouseEvent) {
    event.stopPropagation();
    await this.dictionaryService.addWordToDictionary(this.card.id, category);
    this.cardCategoryChanged.emit();
  }
}
