import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";
import { join } from "path";
import vm from "vm";
import * as type_annotation from "chai_typescript_type_annotation_tests";

describe("Lab 5 — Section 3: Static Members", () => {
  let context: any = {};
  const filePath = join(__dirname, "../src/section3_static_members.ts");

  before(() => {
    const tsCode = readFileSync(filePath, "utf8");
    const jsCode = ts.transpile(tsCode);
    vm.createContext(context);
    vm.runInContext(jsCode, context);
  });

  type_annotation.expectClassPropertyTypeAnnotation(
    filePath,
    "Counter",
    "count",
    "number"
  );

  type_annotation.matchClassMethodParameterTypeAnnotation(
    filePath,
    "Counter",
    "increment",
    []
  );

  type_annotation.matchClassMethodParameterTypeAnnotation(
    filePath,
    "Counter",
    "getCount",
    []
  );

  type_annotation.expectClassMethodReturnTypeAnnotation(
    filePath,
    "Counter",
    "increment",
    "void"
  );

  type_annotation.expectClassMethodReturnTypeAnnotation(
    filePath,
    "Counter",
    "getCount",
    "number"
  );

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
