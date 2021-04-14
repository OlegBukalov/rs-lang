import { Component, Input } from '@angular/core';
import { IWord } from 'src/app/core/interfaces/iword';
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

  settings: ITextBookSettings = this.textBookSettingsService.getSettings();

  constructor(private textBookSettingsService: TextBookSettingsService) {}
}
