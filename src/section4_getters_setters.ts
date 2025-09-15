class Rectangle {
  _width: number;
  height: number;

  constructor(width: number, height: number) {
    this._width = width;
    this.height = height;
  };

  get area(): number {
    return Number((this.width * this.height).toFixed(2));
  }

  get width(): number {
    return this._width;
  }

  set width(w: number) {
    if (w > 0){
      this._width = w;
    }
  }
}
