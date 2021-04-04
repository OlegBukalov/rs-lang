import { Component, Input } from '@angular/core';
// import { IWord } from 'src/app/core/interfaces/iword';

@Component({
  selector: 'app-audio-call-game',
  templateUrl: './audio-call-game.component.html',
  styleUrls: ['./audio-call-game.component.scss'],
})
export class AudioCallGameComponent {
  @Input() level;

  // @Input() aWord: ;
}
