// Create a class Rectangle with:
// - width: number
// - height: number
// Add a get area() that returns width * height
// Add a set width(value) that sets width only if it's > 0

// Your code here 👇
class Rectangle {
  private _width: number = 0;
  public height: number;

  public constructor(width: number, height: number) {
    this._width = width;
    this.height = height;
  }

  get area(): number {
    return Math.round(this._width * this.height * 100) / 100;
  }

  get width(): number {
    return this._width;
  }

  set width(w: number) {
    if (w > 0) {
      this._width = w;
    }
  }
}
