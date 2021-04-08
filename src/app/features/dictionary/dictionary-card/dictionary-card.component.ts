import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IWord } from 'src/app/core/interfaces/iword';

@Component({
  selector: 'app-dictionary-card',
  templateUrl: './dictionary-card.component.html',
  styleUrls: ['./dictionary-card.component.scss'],
})
export class DictionaryCardComponent {
  @Input() card: IWord;

  @ViewChild('audio') audioElement: ElementRef;

  playAudio() {
    const audio = this.audioElement.nativeElement as HTMLAudioElement;
    audio.play();
  }
}
