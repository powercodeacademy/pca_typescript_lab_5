// TASK:
// Create a class `Rectangle` with:
// - `width`: number
// - `height`: number
// Add a `get area()` that returns width * height
// Add a `set width(value)` that sets width only if it's > 0

// Your code here 👇
class Rectangle {
  private _width: number;
  height: number;

  constructor(width: number, height: number) {
    this._width = width;
    this.height = height;
  }
  get width(): number {
    return this._width;
  }

  set width(value: number) {
    if (value > 0) {
      this._width = value;
    }
  }

  get area(): number {
    return Number((this.width * this.height).toFixed(2));
  }
}
