class Person {
  name: string;
  age: number;

  greet(): string {
    return `Hi, I'm ${this.name}`;
  };

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  };
};
