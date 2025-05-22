import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";
import { join } from "path";
import vm from "vm";
import * as type_annotation from "chai_typescript_type_annotation_tests";

describe("Lab 5 — Section 5 (Bonus): Inheritance", () => {
  let context: any = {};

  before(() => {
    const tsCode = readFileSync(
      join(__dirname, "../src/section5_bonus_inheritance.ts"),
      "utf8"
    );
    const jsCode = ts.transpile(tsCode);
    vm.createContext(context);
    vm.runInContext(jsCode, context);
  });

  type_annotation.expectClassMethodReturnTypeAnnotation(
    join(__dirname, "../src/section5_bonus_inheritance.ts"),
    "Animal",
    "speak",
    "string"
  );

  type_annotation.expectClassMethodReturnTypeAnnotation(
    join(__dirname, "../src/section5_bonus_inheritance.ts"),
    "Dog",
    "speak",
    "string"
  );

  it("should allow Dog to override Animal's speak method", () => {
    const dog = new context.Dog();
    expect(dog.speak()).to.equal("Woof!");
  });
  it("should have a Dog class that extends Animal", () => {
    const dog = new context.Dog();
    expect(dog).to.be.an.instanceOf(context.Animal);
  });

  it("should have Animal's speak method return 'Some sound'", () => {
    const animal = new context.Animal();
    expect(animal.speak()).to.equal("Some sound");
  });

  it("should have Dog's speak method return 'Woof!'", () => {
    const dog = new context.Dog();
    expect(dog.speak()).to.equal("Woof!");
  });

  it("should maintain instance identity through inheritance", () => {
    const dog = new context.Dog();
    expect(dog instanceof context.Dog).to.be.true;
    expect(dog instanceof context.Animal).to.be.true;
  });

  it("should allow casting Dog to Animal and maintain behavior", () => {
    const dog = new context.Dog();
    const animal: typeof context.Animal = dog;
    expect(animal.speak()).to.equal("Woof!");
  });

  it("should have proper method overriding (not hiding)", () => {
    const dogAsAnimal: typeof context.Animal = new context.Dog();
    expect(dogAsAnimal.speak()).to.equal("Woof!");
  });
});
