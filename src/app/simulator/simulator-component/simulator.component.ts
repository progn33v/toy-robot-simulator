import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { NotifyService, Directions, Rotations } from '@app/shared';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss'],
})
export class SimulatorComponent {
  x: number = null;
  y: number = null;
  direction: Directions = null;
  rotations = Rotations;

  minVal = 0;
  maxVal = 5;
  directions: string[] = Object.values(Directions);
  directionArray: {
    value: string;
    label: string;
  }[] = this.directions.map((direction) => ({
    value: direction,
    label: direction,
  }));

  form: FormGroup = this.fb.group({
    x_position: [null, Validators.required],
    y_position: [null, [Validators.required]],
    direction: [null, Validators.required],
  });

  get xPosition(): AbstractControl {
    return this.form?.get('x_position');
  }

  get yPosition(): AbstractControl {
    return this.form?.get('y_position');
  }

  get toyDirection(): AbstractControl {
    return this.form?.get('direction');
  }

  constructor(private fb: FormBuilder, private notify: NotifyService) {}

  placeToy(): void {
    if (this.form.invalid) {
      this.notify?.warning &&
        this.notify.warning('Invalid input', 'Unable to place');
      return;
    }

    const placeInput = this.form.value;
    if (!this.directions.includes(placeInput.direction)) {
      this.notify?.error &&
        this.notify.error('Please enter valid direction', 'Unable to place');
    } else if (
      !this.between(placeInput.x_position) ||
      !this.between(placeInput.y_position)
    ) {
      this.notify?.error &&
        this.notify.error('Please enter valid coordinate', 'Unable to place');
    } else {
      this.x = placeInput.x_position;
      this.y = placeInput.y_position;
      this.direction = placeInput.direction;
    }
  }

  move(): void {
    if (!this.isToyPlaced()) {
      this.notify?.error &&
        this.notify.error('Please place the toy first', 'Unable to move');
      return;
    }

    if (this.direction === Directions.North && this.between(this.y + 1)) {
      this.y += 1;
    } else if (
      this.direction === Directions.South &&
      this.between(this.y - 1)
    ) {
      this.y -= 1;
    } else if (this.direction === Directions.East && this.between(this.x + 1)) {
      this.x += 1;
    } else if (this.direction === Directions.West && this.between(this.x - 1)) {
      this.x -= 1;
    } else {
      this.notify?.warning &&
        this.notify.warning('Invalid move', 'Unable to move');
    }
  }

  rotate(rotation: Rotations): void {
    if (!this.isToyPlaced()) {
      this.notify?.error &&
        this.notify.error('Please place the toy first', 'Unable to rotate');
      return;
    }

    const dirIndex = this.directions.indexOf(this.direction);
    const dirLength = this.directions.length;
    this.direction = this.directions[
      (dirIndex + dirLength + (rotation === Rotations.Left ? -1 : 1)) %
        dirLength
    ] as Directions;
  }

  report(): void {
    if (!this.isToyPlaced()) {
      this.notify?.error &&
        this.notify.error('Please place the toy first', 'Unable to report');
      return;
    }

    this.notify?.success &&
      this.notify.success(
        `Output: ${this.x}, ${this.y}, ${this.direction}`,
        'Report'
      );
  }

  counter(i: number): Array<number> {
    return new Array(i);
  }

  isCurrent(i: number, j: number): boolean {
    return i === this.x && j === this.y;
  }

  private isToyPlaced(): boolean {
    return this.direction && this.x !== null && this.y !== null;
  }

  private between(
    value: number,
    minValue: number = this.minVal,
    maxValue: number = this.maxVal
  ): boolean {
    return value >= minValue && value < maxValue;
  }
}
