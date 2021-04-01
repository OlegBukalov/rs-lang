import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IWord } from 'src/app/core/interfaces/iword';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';

@Component({
  selector: 'app-card-popup',
  templateUrl: './card-popup.component.html',
  styleUrls: ['./card-popup.component.scss'],
})
export class CardPopupComponent {
  cardId: string;

  card: IWord;

  // TODO: buttons to add word to dictionary

  constructor(private route: ActivatedRoute, private wordsApiService: WordsApiService) {
    this.route.params.subscribe((params) => {
      this.cardId = params.cardId;
      this.updateCard();
    });
  }

  updateCard() {
    this.wordsApiService.getCardById(this.cardId).subscribe((card) => {
      this.card = card;
    });
  }

  playAudio() {
    const audio = new Audio();
    audio.src = `data:audio/mpeg;base64,${this.card.audio}`;
    audio.play();
  }
}
