# TypeScript Lesson 5: Classes, Access Modifiers & Static Members

Welcome to your fifth TypeScript lab! In the previous lessons, you learned about basic types, objects, arrays, type aliases, union types, interfaces, tuples, and enums. Now we're going to explore TypeScript's object-oriented programming features: **classes**, **access modifiers**, **static members**, **getters and setters**, and **inheritance**.

You already know how to create objects in JavaScript, but what if you want to create blueprints for objects that share the same structure and behavior? What if you want to control who can access certain properties? Or what if you want to create methods that belong to the class itself rather than individual instances? That's where TypeScript's class system comes in—it gives you powerful tools for organizing and structuring your code.

Think of it like this: in JavaScript, you might create objects and hope they behave consistently. In TypeScript, you can define exactly how objects should be created, what properties they should have, and how they should behave—all while TypeScript helps you catch mistakes before they become bugs.

## Learning Objectives

By the end of this lab, you'll be comfortable with:

- Creating classes with properties and methods
- Using `public`, `private`, and `readonly` access modifiers
- Defining and using `static` properties and methods
- Implementing getters and setters for controlled property access
- Understanding inheritance and method overriding

## Getting Started

First, clone this repository to your local machine and install the required dependencies:

```bash
npm install
npm test
```

You should see test output showing which tests are passing and failing. Don't worry if tests are failing initially - that's expected! You'll be implementing the code to make them pass.

---

## Classes: Blueprints for Objects

In JavaScript, you might create objects like this:

```javascript
let person = {
  name: "Alice",
  age: 25,
  greet: function () {
    return "Hi, I'm " + this.name
  },
}
```

But what if you want to create multiple people with the same structure? What if you want to ensure that every person object has a `name`, `age`, and `greet` method? That's where **classes** come in.

A class is like a blueprint for creating objects. It defines what properties objects should have and what methods they should be able to perform:

```typescript
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

// Now you can create multiple people using the same blueprint
let alice = new Person("Alice", 25)
let bob = new Person("Bob", 30)

console.log(alice.greet()) // "Hi, I'm Alice"
console.log(bob.greet()) // "Hi, I'm Bob"
```

The `constructor` is a special method that runs when you create a new instance of the class. It's where you set up the initial values for your object's properties. The `this` keyword refers to the current instance of the class.

### Practice: Basic Classes

**Your Task**: Open `src/section1_classes.ts` and complete the following:

1. Create a `Person` class with:

   - `name`: string property
   - `age`: number property
   - `constructor(name: string, age: number)` that sets both properties
   - `greet()`: method that returns a greeting string

2. Create an instance of the `Person` class

**Hint**: Use the `class` keyword, define properties, create a constructor, and add methods. Use `this` to refer to the current instance.

---

## Access Modifiers: Controlling Property Access

By default, all properties and methods in a TypeScript class are `public`, meaning they can be accessed from anywhere. But sometimes you want to control who can access certain parts of your class. That's where **access modifiers** come in.

TypeScript provides three access modifiers:

- `public` - accessible from anywhere (default)
- `private` - only accessible within the class itself
- `readonly` - can be read from anywhere, but can only be set during initialization

Here's how they work:

```typescript
class Account {
  public owner: string // Anyone can read and write
  private balance: number // Only this class can access
  readonly id: number // Anyone can read, but can't change after creation

  constructor(owner: string, id: number, initialBalance: number) {
    this.owner = owner
    this.id = id
    this.balance = initialBalance
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount // OK - we're inside the class
    }
  }

  getBalance(): number {
    return this.balance // OK - we're inside the class
  }
}

let account = new Account("Alice", 12345, 1000)
console.log(account.owner) // "Alice" - public property
console.log(account.id) // 12345 - readonly property
account.deposit(500) // OK - public method
console.log(account.getBalance()) // 1500 - public method

// account.balance = 2000;       // ERROR - private property
// account.id = 99999;           // ERROR - readonly property
```

Private properties are perfect for internal state that shouldn't be modified directly from outside the class. Readonly properties are great for values that should never change after the object is created, like IDs or timestamps.

### Practice: Access Modifiers

**Your Task**: Open `src/section2_access_modifiers.ts` and complete the following:

1. Create an `Account` class with:

   - `owner`: public string property
   - `balance`: private number property
   - `id`: readonly number property
   - `constructor(owner: string, id: number, initialBalance: number)` that sets all properties
   - `deposit(amount: number)`: method that increases the balance (only if amount > 0)

2. Create an instance of the `Account` class

**Hint**: Use `public`, `private`, and `readonly` keywords to control access. Private properties can only be accessed from within the class.

---

## Static Members: Belonging to the Class

Sometimes you want properties or methods that belong to the class itself, not to individual instances. These are called **static** members. They're shared across all instances of the class and can be accessed without creating an instance.

Here's how static members work:

```typescript
class Counter {
  static count: number = 0 // Shared across all instances

  static increment(): void {
    Counter.count++ // Access static property with class name
  }

  getCount(): number {
    return Counter.count // Instance method can access static property
  }
}

// Use static members without creating an instance
Counter.increment()
Counter.increment()
console.log(Counter.count) // 2

// Create instances - they all share the same static count
let counter1 = new Counter()
let counter2 = new Counter()

console.log(counter1.getCount()) // 2
console.log(counter2.getCount()) // 2

Counter.increment()
console.log(counter1.getCount()) // 3
console.log(counter2.getCount()) // 3
```

Static members are perfect for:

- Keeping track of how many instances have been created
- Storing configuration that applies to all instances
- Utility methods that don't need instance data
- Constants that are related to the class

### Practice: Static Members

**Your Task**: Open `src/section3_static_members.ts` and complete the following:

1. Create a `Counter` class with:

   - `static count`: number property (shared across all instances)
   - `static increment()`: method that increases the static count
   - `getCount()`: instance method that returns the current static count

2. Test the static functionality

**Hint**: Use the `static` keyword for class-level members. Access static properties with `ClassName.propertyName`.

---

## Getters and Setters: Controlled Property Access

Sometimes you want to control how properties are accessed or modified. Instead of direct property access, you can use **getters** and **setters** to add logic when reading or writing values.

Getters and setters look like properties but are actually methods:

```typescript
class Rectangle {
  private _width: number
  private _height: number

  constructor(width: number, height: number) {
    this._width = width
    this._height = height
  }

  // Getter - looks like a property but runs code
  get area(): number {
    return this._width * this._height
  }

  // Setter - looks like property assignment but runs code
  set width(value: number) {
    if (value > 0) {
      this._width = value
    } else {
      console.log("Width must be positive")
    }
  }

  get width(): number {
    return this._width
  }
}

let rect = new Rectangle(10, 5)
console.log(rect.area) // 50 - calls the getter
rect.width = 15 // Calls the setter
console.log(rect.area) // 75 - area recalculated automatically
rect.width = -5 // Calls setter, but value rejected
console.log(rect.width) // Still 15
```

Notice how we use `rect.area` and `rect.width = 15` as if they were properties, but they're actually calling methods behind the scenes. This gives you the convenience of property syntax with the power of method logic.

Getters and setters are perfect for:

- Computed properties (like `area` from `width` and `height`)
- Validation when setting values
- Logging or debugging when properties are accessed
- Lazy loading of expensive calculations

### Practice: Getters and Setters

**Your Task**: Open `src/section4_getters_setters.ts` and complete the following:

1. Create a `Rectangle` class with:

   - `_width`: private number property
   - `_height`: private number property
   - `constructor(width: number, height: number)` that sets both properties
   - `get area()`: getter that returns width × height
   - `get width()`: getter that returns the width
   - `set width(value: number)`: setter that only accepts positive numbers

2. Test the getter and setter functionality

**Hint**: Use `get` and `set` keywords. Getters and setters look like properties but are actually methods.

---

## Bonus: Inheritance and Method Overriding

Sometimes you want to create a new class that's based on an existing class, inheriting its properties and methods while adding new ones or changing existing behavior. This is called **inheritance**.

In TypeScript, you use the `extends` keyword to create a subclass:

```typescript
class Animal {
  name: string

  constructor(name: string) {
    this.name = name
  }

  speak(): string {
    return "Some sound"
  }
}

class Dog extends Animal {
  speak(): string {
    return "Woof!" // Override the parent's speak method
  }

  wagTail(): string {
    return `${this.name} is wagging their tail`
  }
}

let animal = new Animal("Generic Animal")
let dog = new Dog("Buddy")

console.log(animal.speak()) // "Some sound"
console.log(dog.speak()) // "Woof!" - uses overridden method
console.log(dog.wagTail()) // "Buddy is wagging their tail"
```

The `Dog` class inherits the `name` property and `speak()` method from `Animal`, but it overrides the `speak()` method with its own implementation. It also adds a new `wagTail()` method that only dogs have.

Inheritance is perfect for:

- Creating specialized versions of general classes
- Sharing common behavior between related classes
- Building complex object hierarchies
- Following the DRY (Don't Repeat Yourself) principle

### Practice: Inheritance and Method Overriding (Bonus Challenge)

**Your Task**: Open `src/section5_bonus_inheritance.ts` and complete the following:

1. Create an `Animal` class with:

   - `name`: string property
   - `constructor(name: string)` that sets the name
   - `speak()`: method that returns "Some sound"

2. Create a `Dog` class that:

   - Extends `Animal`
   - Overrides `speak()` to return "Woof!"
   - Adds a `wagTail()` method that returns a string about wagging

3. Test both classes

**Hint**: Use the `extends` keyword to inherit from a parent class. Override methods by defining them again in the child class.

---

## Why This Matters

Classes, access modifiers, static members, getters, setters, and inheritance are fundamental to writing maintainable TypeScript code. They let you:

- **Organize your code** - Group related data and behavior together
- **Control access** - Protect internal state with private properties
- **Share behavior** - Use static members for class-level functionality
- **Validate data** - Use setters to ensure data integrity
- **Build hierarchies** - Use inheritance to create specialized classes
- **Write reusable code** - Create blueprints that can be instantiated multiple times

These concepts are especially important when building applications with complex data models, user interfaces, or any system where you need to manage state and behavior in an organized way.

---

### Common Troubleshooting

**"Property 'X' is missing in type 'Y'"**

- Check that your class includes all required properties
- Make sure you're providing values for every property in your constructor

**"Property 'X' is private and only accessible within class 'Y'"**

- You're trying to access a private property from outside the class
- Use a public method to access the private property instead

**"Cannot assign to 'X' because it is a read-only property"**

- You're trying to modify a readonly property after initialization
- Readonly properties can only be set in the constructor

**"Static member 'X' of class 'Y' is accessed incorrectly"**

- Use the class name (e.g., `Counter.count`) to access static members
- Don't use an instance (e.g., `counter.count`) for static members

**"Method 'X' of class 'Y' is not assignable to parameter of type 'Z'"**

- Check that your method signatures match what the tests expect
- Make sure you're using the correct return types

**Tests failing?**

- Make sure you're using explicit type annotations (the `: Type` syntax)
- Check that your classes have the correct structure and methods
- Verify that your access modifiers are used correctly
- Ensure your constructor parameters match the expected types
- Make sure your getters and setters are defined properly
