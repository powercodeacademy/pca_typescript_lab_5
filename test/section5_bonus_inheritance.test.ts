import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";
import { join } from "path";
import vm from "vm";

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

  it("should allow Dog to override Animal's speak method", () => {
    const dog = new context.Dog();
    expect(dog.speak()).to.equal("Woof!");
  });
});
