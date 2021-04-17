import { Injectable } from '@angular/core';
import {
  ANIMAL_WIDTH,
  INVERTER,
  MAX_COORDINATE_Y,
  MAX_SCREEN_WIDTH,
  MIN_COORDINATE_Y,
  MIN_SCREEN_WIDTH,
  STABILIZATION_FACTOR,
  STEP_Y,
} from '../constants';

@Injectable({
  providedIn: 'root',
})
export class CoordinateService {
  stepsYCounter = 0;

  inverterState = INVERTER;

  getAnimalCoordinateY(): number {
    if (window.innerWidth >= MIN_SCREEN_WIDTH && window.innerWidth <= MAX_SCREEN_WIDTH) {
      return (
        MIN_COORDINATE_Y +
        (window.innerWidth - MIN_SCREEN_WIDTH) /
          ((STABILIZATION_FACTOR * window.innerWidth) / MIN_SCREEN_WIDTH)
      );
    }
    if (window.innerWidth < MIN_SCREEN_WIDTH) {
      return MIN_COORDINATE_Y;
    }
    return MAX_COORDINATE_Y;
  }

  calculateStepY(): number {
    if (this.stepsYCounter === 4) {
      this.inverterState *= INVERTER;
      this.stepsYCounter = 0;
    }
    this.stepsYCounter += 1;
    return STEP_Y * this.inverterState;
  }

  getWindowWidth(): number {
    return window.innerWidth - ANIMAL_WIDTH;
  }
}
