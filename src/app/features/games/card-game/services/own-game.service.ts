import { Injectable } from '@angular/core';

export enum GameState {
  STOP,
  PLAY,
  HOLD,
  RESULT,
}
@Injectable({
  providedIn: 'root',
})
export class OwnGameService {
  private idItemDisable: string;

  setDisabledItemId(item: string) {
    this.idItemDisable = item;
  }

  getDisabledItemId(): string {
    return this.idItemDisable;
  }
}
