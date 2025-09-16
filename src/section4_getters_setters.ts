// TASK:
// Create a class `Rectangle` with:
// - `width`: number
// - `height`: number
// Add a `get area()` that returns width * height
// Add a `set width(value)` that sets width only if it's > 0

// Your code here 👇
class Rectangle {
  height: number;

  private _width: number = 0;

  constructor(width: number, height: number) {
    this._width = width;
    this.height = height;
  }

  get area(): number {
    return Math.round(this.width * this.height * 100) / 100;
  }

  set width(value: number) {
    if (value > 0) {
      this._width = value;
    }
  }

  get width(): number {
    return this._width;
  }
}
