import { Component, Input } from '@angular/core';
import { IWord } from 'src/app/core/interfaces/iword';

@Component({
  selector: 'app-text-book-page',
  templateUrl: './text-book-page.component.html',
  styleUrls: ['./text-book-page.component.scss'],
})
export class TextBookPageComponent {
  @Input() words: IWord[];
}
