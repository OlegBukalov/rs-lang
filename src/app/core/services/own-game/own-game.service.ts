import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OwnGameService {
  idItemDisable: string;

  setItemDisable(item: string) {
    this.idItemDisable = item;
  }

  getItemDisable(): string {
    return this.idItemDisable;
  }
}
