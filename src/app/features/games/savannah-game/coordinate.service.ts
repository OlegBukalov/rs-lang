import { Injectable } from '@angular/core';
import {
  INVERTER,
  MAX_COORDINATE_Y,
  MAX_SCREEN_WIDTH,
  MIN_COORDINATE_Y,
  MIN_SCREEN_WIDTH,
  SCREEN_WIDTH,
  STABILIZATION_FACTOR,
  STEP_Y,
} from './constants';

@Injectable({
  providedIn: 'root',
})
export class CoordinateService {
  stepsYCounter = 0;

  inverterState = INVERTER;

  getAnimalCoordinateY(): number {
    if (SCREEN_WIDTH >= MIN_SCREEN_WIDTH && SCREEN_WIDTH <= MAX_SCREEN_WIDTH) {
      return (
        MIN_COORDINATE_Y +
        (SCREEN_WIDTH - MIN_SCREEN_WIDTH) /
          ((STABILIZATION_FACTOR * SCREEN_WIDTH) / MIN_SCREEN_WIDTH)
      );
    }
    if (SCREEN_WIDTH < MIN_SCREEN_WIDTH) {
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
}
