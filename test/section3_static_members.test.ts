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

  it("should have a static count property initialized to 0", () => {
    context.Counter.count = 0;
    expect(context.Counter.count).to.equal(0);
  });

  it("should share the same count across all instances", () => {
    context.Counter.count = 0;
    const counter1 = new context.Counter();
    const counter2 = new context.Counter();

    context.Counter.increment();
    expect(counter1.getCount()).to.equal(1);
    expect(counter2.getCount()).to.equal(1);
  });

  it("should increment multiple times", () => {
    context.Counter.count = 0;
    context.Counter.increment();
    context.Counter.increment();
    context.Counter.increment();

    const counter = new context.Counter();
    expect(counter.getCount()).to.equal(3);
  });

  it("should work with multiple instances calling getCount()", () => {
    context.Counter.count = 10;
    const counter1 = new context.Counter();
    const counter2 = new context.Counter();
    const counter3 = new context.Counter();

    expect(counter1.getCount()).to.equal(10);
    expect(counter2.getCount()).to.equal(10);
    expect(counter3.getCount()).to.equal(10);

    context.Counter.increment();

    expect(counter1.getCount()).to.equal(11);
    expect(counter2.getCount()).to.equal(11);
    expect(counter3.getCount()).to.equal(11);
  });

  it("should be accessible directly through the class", () => {
    context.Counter.count = 5;
    expect(context.Counter.count).to.equal(5);

    context.Counter.increment();
    expect(context.Counter.count).to.equal(6);
  });
});
