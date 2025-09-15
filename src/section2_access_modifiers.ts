class Account {
  public owner: string;
  private balance: number;
  readonly id: number;

  constructor(owner: string, id: number, balance: number) {
    this.owner = owner;
    this.balance = balance;
    this.id = id;
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    }
  }

  getBalance() :number {
    return this.balance
  }
}
