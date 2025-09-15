class Counter {
  static count: number = 0;

  getCount(): number {
    return Counter.count
  }

  static increment(): void {
    Counter.count ++;
  }
}
