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
  it("should not increase balance when negative amount is deposited", () => {
    const account = new context.Account("Alice", 456, 200);
    account.deposit(-50);
    expect(account.getBalance()).to.equal(200);
  });

  it("should not increase balance when zero amount is deposited", () => {
    const account = new context.Account("Charlie", 789, 300);
    account.deposit(0);
    expect(account.getBalance()).to.equal(300);
  });

  it("should correctly handle multiple deposits", () => {
    const account = new context.Account("Dave", 101, 150);
    account.deposit(50);
    account.deposit(100);
    account.deposit(75);
    expect(account.getBalance()).to.equal(375);
  });

  it("should have the correct method signatures", () => {
    const account = new context.Account("Frank", 303, 500);
    expect(account.deposit).to.be.a("function");
    expect(account.getBalance).to.be.a("function");
    expect(account.getBalance()).to.be.a("number");
  });

  it("should be able to modify the owner property", () => {
    const account = new context.Account("Ian", 606, 800);
    account.owner = "Jane";
    expect(account.owner).to.equal("Jane");
  });

  it("should preserve types when transpiled", () => {
    const tsCode = readFileSync(
      join(__dirname, "../src/section2_access_modifiers.ts"),
      "utf8"
    );
    const sourceFile = ts.createSourceFile(
      "test.ts",
      tsCode,
      ts.ScriptTarget.Latest,
      true
    );

    let hasOwnerProperty = false;
    let hasBalanceProperty = false;
    let hasIdProperty = false;

    function visit(node: ts.Node) {
      if (ts.isPropertyDeclaration(node)) {
        if (
          node.name.getText() === "owner" &&
          node.modifiers?.some((m) => m.kind === ts.SyntaxKind.PublicKeyword)
        ) {
          hasOwnerProperty = true;
        }
        if (
          node.name.getText() === "balance" &&
          node.modifiers?.some((m) => m.kind === ts.SyntaxKind.PrivateKeyword)
        ) {
          hasBalanceProperty = true;
        }
        if (
          node.name.getText() === "id" &&
          node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ReadonlyKeyword)
        ) {
          hasIdProperty = true;
        }
      }
      ts.forEachChild(node, visit);
    }

    visit(sourceFile);

    expect(hasOwnerProperty).to.be.true;
    expect(hasBalanceProperty).to.be.true;
    expect(hasIdProperty).to.be.true;
  });
});
