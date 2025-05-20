import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";
import { join } from "path";
import vm from "vm";

describe("Lab 5 — Section 1: Classes", () => {
  let context: any = {};

  before(() => {
    const tsCode = readFileSync(
      join(__dirname, "../src/section1_classes.ts"),
      "utf8"
    );
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
});
