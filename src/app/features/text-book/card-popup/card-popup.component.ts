import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IWord } from 'src/app/core/interfaces/iword';
import { DictionaryService } from 'src/app/core/services/dictionary.service';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';
import { DictionaryCategory } from '../../dictionary/dictionary-category';
import { ITextBookSettings } from '../../settings/interfaces/itext-book-settings';
import { TextBookSettingsService } from '../../settings/services/text-book-settings.service';

@Component({
  selector: 'app-card-popup',
  templateUrl: './card-popup.component.html',
  styleUrls: ['./card-popup.component.scss'],
})
export class CardPopupComponent {
  card: IWord;

  settings: ITextBookSettings = this.textBookSettingsService.getSettings();

  category = DictionaryCategory;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wordsApiService: WordsApiService,
    private dictionaryService: DictionaryService,
    private textBookSettingsService: TextBookSettingsService,
  ) {
    this.route.params.subscribe((params) => {
      const { cardId } = params;
      if (!cardId) return;
      this.updateCard(cardId);
    });
  }

  updateCard(cardId: string) {
    this.wordsApiService.getCardById(cardId).subscribe(
      (card) => {
        this.card = card;
        this.dictionaryService.addWordToDictionary(this.card.id, DictionaryCategory.Studied);
      },
      () => this.router.navigateByUrl(this.router.url.replace(/\/card\/.+/, '')),
    );
  }

  playAudio(audioPath: string) {
    const audio = new Audio();
    audio.src = `data:audio/mpeg;base64,${audioPath}`;
    audio.play();
  }

  moveCard(category: DictionaryCategory) {
    this.dictionaryService.addWordToDictionary(this.card.id, category);
  }
}
