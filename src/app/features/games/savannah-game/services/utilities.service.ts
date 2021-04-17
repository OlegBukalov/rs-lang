import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  shuffleWords<T>(array: T[]): T[] {
    const arrayForShuffle = array.slice();
    let randomIndex: number;
    let tempElement: T;
    for (let i = arrayForShuffle.length - 1; i > 0; i -= 1) {
      randomIndex = Math.floor(Math.random() * (i + 1));
      tempElement = arrayForShuffle[randomIndex];
      arrayForShuffle[randomIndex] = arrayForShuffle[i];
      arrayForShuffle[i] = tempElement;
    }
    return arrayForShuffle;
  }

  debounce(func: Function, debounceTime: number): VoidFunction {
    let timeout = null;
    return (...args) => {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, debounceTime);
    };
  }

  compareObjectsByProperty<T>(propertyName: string, object1: T, object2: T): boolean {
    return object1[propertyName] === object2[propertyName];
  }
}
