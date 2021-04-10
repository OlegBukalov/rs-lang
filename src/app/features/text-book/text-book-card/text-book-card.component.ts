import { Component, Input } from '@angular/core';
import { IWord } from 'src/app/core/interfaces/iword';
import { ITextBookSettings } from '../../interfaces/itext-book-settings';
import { TextBookSettingsService } from '../../services/text-book-settings.service';

@Component({
  selector: 'app-text-book-card',
  templateUrl: './text-book-card.component.html',
  styleUrls: ['./text-book-card.component.scss'],
})
export class TextBookCardComponent {
  @Input() card: IWord;

  @Input() color: string;

  settings: ITextBookSettings = this.textBookSettingsService.textBookSettings;

  constructor(private textBookSettingsService: TextBookSettingsService) {}
}
