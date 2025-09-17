// TASK:
// Create a class `Rectangle` with:
// - `width`: number
// - `height`: number
// Add a `get area()` that returns width * height
// Add a `set width(value)` that sets width only if it's > 0

// Your code here 👇

class Rectangle {
  public _width: number
  private height: number

  constructor(width: number, height: number) {
    this._width = width
    this.height = height
  }

  public get width(): number {
    return this._width
  }

  public set width(theWidth: number) {
    if (theWidth > 0) {
      this._width = theWidth
    }
  }

  get area(): number {
    return parseFloat((this._width * this.height).toFixed(2))
  }
}
