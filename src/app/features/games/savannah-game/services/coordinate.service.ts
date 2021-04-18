import { Injectable } from '@angular/core';
import {
  ANIMAL_WIDTH,
  INVERTER,
  MAX_COORDINATE_Y,
  MAX_SCREEN_HEIGHT,
  MAX_SCREEN_WIDTH,
  MID_COORDINATE_Y,
  MIN_COORDINATE_Y,
  MIN_SCREEN_HEIGHT,
  MIN_SCREEN_WIDTH,
  STEP_Y,
} from '../constants';

@Injectable({
  providedIn: 'root',
})
export class CoordinateService {
  stepsYCounter = 0;

  inverterState = INVERTER;

  getAnimalCoordinateY(): number {
    if (window.innerWidth <= MIN_SCREEN_WIDTH && window.innerHeight <= MIN_SCREEN_HEIGHT) {
      return MIN_COORDINATE_Y;
    }
    if (window.innerWidth <= MAX_SCREEN_WIDTH && window.innerHeight <= MAX_SCREEN_HEIGHT) {
      return MAX_COORDINATE_Y;
    }
    return MID_COORDINATE_Y;
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
