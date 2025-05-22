import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";
import { join } from "path";
import vm from "vm";
import * as type_annotation from "chai_typescript_type_annotation_tests";

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

  type_annotation.expectClassPropertyTypeAnnotation(
    join(__dirname, "../src/section4_getters_setters.ts"),
    "Rectangle",
    "_width",
    "number"
  );

  type_annotation.expectClassPropertyTypeAnnotation(
    join(__dirname, "../src/section4_getters_setters.ts"),
    "Rectangle",
    "height",
    "number"
  );

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

  it("should initialize with the correct values", () => {
    const rect = new context.Rectangle(7, 9);
    expect(rect.width).to.equal(7);
    expect(rect.height).to.equal(9);
    expect(rect.area).to.equal(63);
  });

  it("should update area when height is modified", () => {
    const rect = new context.Rectangle(5, 10);
    expect(rect.area).to.equal(50);
    rect.height = 20;
    expect(rect.area).to.equal(100);
  });

  it("should handle edge cases for width", () => {
    const rect = new context.Rectangle(5, 10);
    rect.width = 0;
    expect(rect.width).to.equal(5); // Should not change
    rect.width = -10;
    expect(rect.width).to.equal(5); // Should not change
    rect.width = 0.1;
    expect(rect.width).to.equal(0.1); // Should change (>0)
  });

  it("should handle decimal values correctly", () => {
    const rect = new context.Rectangle(2.5, 3.5);
    expect(rect.area).to.equal(8.75);
    rect.width = 4.2;
    expect(rect.width).to.equal(4.2);
    expect(rect.area).to.equal(14.7);
  });

  it("should handle multiple width changes", () => {
    const rect = new context.Rectangle(10, 10);
    expect(rect.area).to.equal(100);
    rect.width = 15;
    expect(rect.area).to.equal(150);
    rect.width = -5; // Invalid
    expect(rect.area).to.equal(150); // No change
    rect.width = 20;
    expect(rect.area).to.equal(200);
  });

  it("should preserve width with value of 0 or negative in constructor", () => {
    const rect = new context.Rectangle(0, 10);
    expect(rect.width).to.equal(0);
    expect(rect.area).to.equal(0);

    const rect2 = new context.Rectangle(-5, 10);
    expect(rect2.width).to.equal(-5);
    expect(rect2.area).to.equal(-50);
  });
});
