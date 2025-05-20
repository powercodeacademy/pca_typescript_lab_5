import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";
import { join } from "path";
import vm from "vm";

describe("Lab 5 — Section 1: Classes", () => {
  let context: any = {};
  const filePath = join(__dirname, "../src/section1_classes.ts");

  before(() => {
    const tsCode = readFileSync(filePath, "utf8");
    const jsCode = ts.transpile(tsCode);
    vm.createContext(context);
    vm.runInContext(jsCode, context);
  });

  it("should create a Person instance with name and age", () => {
    const person = new context.Person("Alice", 25);
    expect(person.name).to.equal("Alice");
    expect(person.age).to.equal(25);
    expect(person.greet()).to.include("Alice");
  });

  it("should create a Person with different name and age values", () => {
    const person = new context.Person("Bob", 30);
    expect(person.name).to.equal("Bob");
    expect(person.age).to.equal(30);
    expect(person.greet()).to.equal("Hi, I'm Bob");
  });

  it("should correctly update name property", () => {
    const person = new context.Person("Carol", 40);
    person.name = "Carol Smith";
    expect(person.name).to.equal("Carol Smith");
    expect(person.greet()).to.equal("Hi, I'm Carol Smith");
  });

  it("should correctly update age property", () => {
    const person = new context.Person("Dave", 35);
    person.age = 36;
    expect(person.age).to.equal(36);
  });

  it("should handle empty name", () => {
    const person = new context.Person("", 20);
    expect(person.name).to.equal("");
    expect(person.greet()).to.equal("Hi, I'm ");
  });

  it("should handle zero age", () => {
    const person = new context.Person("Baby", 0);
    expect(person.age).to.equal(0);
  });

  it("should handle name with special characters", () => {
    const person = new context.Person("John O'Neill", 45);
    expect(person.name).to.equal("John O'Neill");
    expect(person.greet()).to.equal("Hi, I'm John O'Neill");
  });

  it("Person class should have the correct structure", () => {
    const PersonClass = context.Person;
    const personInstance = new PersonClass("Test", 1);

    expect(PersonClass).to.be.a("function");
    expect(personInstance).to.be.an.instanceof(PersonClass);
    expect(personInstance).to.have.property("name");
    expect(personInstance).to.have.property("age");
    expect(personInstance.greet).to.be.a("function");
  });
});
