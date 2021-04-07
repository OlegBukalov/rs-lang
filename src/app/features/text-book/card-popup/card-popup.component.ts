import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IWord } from 'src/app/core/interfaces/iword';
import { DictionaryService } from 'src/app/core/services/dictionary.service';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';

@Component({
  selector: 'app-card-popup',
  templateUrl: './card-popup.component.html',
  styleUrls: ['./card-popup.component.scss'],
})
export class CardPopupComponent {
  card: IWord;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wordsApiService: WordsApiService,
    private dictionaryService: DictionaryService,
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
        this.dictionaryService.AddWordToDictionary(this.card.id);
      },
      () => this.router.navigateByUrl(this.router.url.replace(/\/card\/.+/, '')),
    );
  }

  playAudio() {
    const audio = new Audio();
    audio.src = `data:audio/mpeg;base64,${this.card.audio}`;
    audio.play();
  }
}
