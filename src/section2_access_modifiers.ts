// TASK:
// Create a class `Account` with:
// - public `owner`: string
// - private `balance`: number
// - readonly `id`: number
// Add a method `deposit(amount: number)` to increase the balance

// Your code here 👇
class Account {
  public owner: string;
  private balance: number;
  private readonly id: number;

  public constructor(owner: string, id: number, balance: number) {
    this.owner = owner;
    this.balance = balance;
    this.id = id;
  }

  isPositive(num: number): boolean {
    return num > 0;
  }

  deposit(amount: number): void {
    this.isPositive(amount) ? this.balance += amount : this.balance
  }

  getBalance(): number {
    return this.balance
  }


}
