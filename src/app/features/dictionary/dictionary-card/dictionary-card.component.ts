import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IWord } from 'src/app/core/interfaces/iword';
import { DictionaryService } from 'src/app/core/services/dictionary.service';
import { DictionaryCategory } from '../dictionary-category';

@Component({
  selector: 'app-dictionary-card',
  templateUrl: './dictionary-card.component.html',
  styleUrls: ['./dictionary-card.component.scss'],
})
export class DictionaryCardComponent {
  @Input() card: IWord;

  @Input() currentCategory: DictionaryCategory;

  @Output() cardMoved = new EventEmitter<void>();

  @ViewChild('audio') audioElement: ElementRef;

  categories = [DictionaryCategory.Studied, DictionaryCategory.Hard, DictionaryCategory.Deleted];

  constructor(private dictionaryService: DictionaryService) {}

  playAudio() {
    const audio = this.audioElement.nativeElement as HTMLAudioElement;
    audio.play();
  }

  async moveCard(category: DictionaryCategory) {
    // eslint-disable-next-line no-underscore-dangle
    await this.dictionaryService.addWordToDictionary(this.card._id, category);
    this.cardMoved.emit();
  }
}
