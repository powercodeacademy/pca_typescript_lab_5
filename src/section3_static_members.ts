// TASK:
// Create a class `Counter` with:
// - static `count`: number
// - static method `increment()` that adds 1 to count
// - instance method `getCount()` that returns the current count

// Your code here 👇
class Counter {
  static count: number = 0;

  static increment(): void {
    this.count += 1;
  }
  getCount(): number {
    return Counter.count;
  }
}
