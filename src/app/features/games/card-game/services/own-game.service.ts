/* eslint-disable @typescript-eslint/lines-between-class-members */
import { Injectable } from '@angular/core';

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
