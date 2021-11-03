class Dog {
  name;
  age;
  favoriteTreat;

  constructor(row) {
    this.name = row.name;
    this.age = row.age;
    this.favoriteTreat = row.favorite_treat;
  }

  static speak() {
    return 'Woof!';
  }

  sayName() {
    return `Woof, my name is ${this.name}`;
  }
}

const row = { name: 'Ruby', age: 11, favorite_treat: 'chicken' };
const dog = new Dog(row); // Dog { name: 'Ruby', age: 11, favoriteTreat: 'chicken' }

console.log(dog);
console.log(`dog.name`, dog.name);
console.log(`dog.age`, dog.age);
console.log(`dog.favoriteTreat`, dog.favoriteTreat);
console.log('-------------------------------------');
console.log(`Dog.speak()`, Dog.speak()); // Static method (exists on the class)
// console.log(`dog.speak()`, dog.speak());
// console.log(`Dog.sayName()`, Dog.sayName());
console.log(`dog.sayName()`, dog.sayName()); // Instance method (exists on instances of the class)
