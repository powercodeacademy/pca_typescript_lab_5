import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";
import { join } from "path";
import vm from "vm";

describe("Lab 5 — Section 3: Static Members", () => {
  let context: any = {};

  before(() => {
    const tsCode = readFileSync(
      join(__dirname, "../src/section3_static_members.ts"),
      "utf8"
    );
    const jsCode = ts.transpile(tsCode);
    vm.createContext(context);
    vm.runInContext(jsCode, context);
  });

  it("should increment static count and return it", () => {
    context.Counter.count = 0;
    context.Counter.increment();
    const counter = new context.Counter();
    expect(counter.getCount()).to.equal(1);
  });
});
