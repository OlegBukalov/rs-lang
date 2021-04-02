import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdValidatorService {
  static validate(id: string): number {
    return !id || Number.isNaN(+id) ? 0 : +id;
  }
}
