// TASK:
// Create a class `Person` with:
// - `name`: string
// - `age`: number
// Add a method `greet()` that returns "Hi, I'm <name>"

// Your code here 👇

class Person {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  greet(): string {
    return `Hi, I'm ${this.name}`
  }
}
