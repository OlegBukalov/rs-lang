import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OwnGameService {
  idItemDisable: string;

  setDisabledItemId(item: string) {
    this.idItemDisable = item;
  }

  getDisabledItemId(): string {
    return this.idItemDisable;
  }
}
