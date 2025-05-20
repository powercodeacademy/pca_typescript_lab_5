import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";
import { join } from "path";
import vm from "vm";

describe("Lab 5 — Section 4: Getters & Setters", () => {
  let context: any = {};

  before(() => {
    const tsCode = readFileSync(
      join(__dirname, "../src/section4_getters_setters.ts"),
      "utf8"
    );
    const jsCode = ts.transpile(tsCode);
    vm.createContext(context);
    vm.runInContext(jsCode, context);
  });

  it("should return correct area and allow width updates", () => {
    const rect = new context.Rectangle(5, 10);
    expect(rect.area).to.equal(50);
    rect.width = 20;
    expect(rect.area).to.equal(200);
  });

  it("should not allow width to be set to non-positive values", () => {
    const rect = new context.Rectangle(5, 10);
    rect.width = -5;
    expect(rect.width).to.equal(5);
  });
});
