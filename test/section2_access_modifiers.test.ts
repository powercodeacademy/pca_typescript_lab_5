import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";
import { join } from "path";
import vm from "vm";

describe("Lab 5 — Section 2: Access Modifiers", () => {
  let context: any = {};

  before(() => {
    const tsCode = readFileSync(
      join(__dirname, "../src/section2_access_modifiers.ts"),
      "utf8"
    );
    const jsCode = ts.transpile(tsCode);
    vm.createContext(context);
    vm.runInContext(jsCode, context);
  });

  it("should increase balance when deposit is called", () => {
    const account = new context.Account("Bob", 123, 100);
    expect(account.owner).to.equal("Bob");
    expect(account.id).to.equal(123);
    account.deposit(50);
    expect(account.getBalance?.()).to.equal(150);
  });
});
