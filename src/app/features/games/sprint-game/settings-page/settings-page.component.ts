import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent {
  @Output() startGame = new EventEmitter();

  levels = [1, 2, 3, 4, 5, 6];

  currentLvl = 1;

  private chooseLvl(lvl: number): void {
    this.currentLvl = lvl;
  }

  onStart(): void {
    this.startGame.emit(this.currentLvl);
  }
}
