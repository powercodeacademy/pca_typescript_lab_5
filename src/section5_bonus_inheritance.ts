// BONUS TASK:
// Create a class `Animal` with a method `speak()` that returns "Some sound"
// Create a class `Dog` that extends `Animal` and overrides `speak()` to return "Woof!"

// Your code here 👇
class Animal {
  speak(): string {
    return 'Some sound'
  }
}

class Dog extends Animal {
  speak(): string {
    return 'Woof!'
  }
}
