# Lab 5 — Classes, Access Modifiers & Static Members (TypeScript)

Welcome to **Lab 5** of the TypeScript Labs! In this lab, you’ll gain hands-on experience working with **classes**, **access modifiers**, **static members**, and more — key features of TypeScript’s object-oriented programming capabilities.

## 🏆 Learning Goals

- Define and instantiate classes
- Use `public`, `private`, and `readonly` access modifiers
- Define and use `static` properties and methods
- Implement getters and setters
- (Bonus) Use inheritance and method overriding

## 🛠️ What to Do

- Complete each task inside the `src/` files
- Run the corresponding Mocha + Chai tests inside the `test/` folder
- You do **not** need to use `export` — tests use the VM sandbox to evaluate your code

## ✅ How to Run Tests

```bash
npm install
npx mocha
```

## 🗂️ Lab Structure & Tasks

### 🔹 section1_classes.ts

- Create a class `Person` with:

  - `name`: string
  - `age`: number

- Add a method `greet()` that returns a string like: "Hi, I'm <name>"

### 🔹 section2_access_modifiers.ts

- Create a class `Account` with:

  - `owner`: public string
  - `balance`: private number
  - `id`: readonly number

- Add a method `deposit(amount: number)` that increases the balance

### 🔹 section3_static_members.ts

- Create a class `Counter` with:

  - `static count`: number
  - `static increment()`: increases `count`
  - `getCount()`: instance method that returns the current count

### 🔹 section4_getters_setters.ts

- Create a class `Rectangle` with:

  - `width`: number
  - `height`: number

- Add a `get area()` that returns width \* height
- Add a `set width(value)` that only accepts positive numbers

### ⭐ section5_bonus_inheritance.ts

- Create a class `Animal` with a method `speak()` that returns "Some sound"
- Create a subclass `Dog` that overrides `speak()` to return "Woof!"

---

**Ready?** Start with `src/section1_classes.ts` and explore TypeScript’s class system! 🧱
