//implicit and explicit object bindings

//IMPLICIT
const user = {
  name: "Rahul",
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  },
};
user.greet(); // Hi, I'm Rahul

//EXPLICIT
function greet() {
  console.log(`Hi, I'm ${this.name}`);
}
const person = { name: "Rahul" };
greet.call(person); // Hi, I'm Rahul
greet.apply(person); // Hi, I'm Rahul
const boundGreet = greet.bind(person);
boundGreet(); // Hi, I'm Rahul

//here this refers to the GLOBAL OBJECT
this.a = 5;
console.log(this.a); //5
console.log(this); //Window/Global Object

//'this' inside a method/ normal function
const userThis = {
  name: "Ramesh Prasad",
  age: 56,
  //normal function
  getAge() {
    console.log(this.age); // here 'this' refers only to the immediate parent object i.e userThis
  },
};
userThis.getAge(); // 56

const data = {
  name: "Prabha",
  address: {
    city: "Kolkata",
    getCity() {
      console.log(this.city, this.name); // name is not in the immediate parent object, hence it will return undefined
    },
  },
};
data.address.getCity(); //Kolkata undefined

//'this' inside an arrow function
const userDetails = {
  name: "Rakesh",
  age: 56,
  getName: () => console.log(this.name), //here this is not pointing to the immediate obj rather currrently it points to the Window Obj
};

userDetails.getName(); //prints NOTHING

//this inside an arrow function which is inside a normal function
const newUserDetails = {
  name: "Prem",
  age: 89,
  getName() {
    const printName = () => console.log(this.name); //here this refers to the this of its parent function i.e newUserDetails
    printName();
  },
};
newUserDetails.getName(); //Prem

//'this' inside a class and constructor
//Inside a class 'this' refers to the instance of the class
class User {
  age;
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getName() {
    console.log(this.name, this.age);
  }
}
const usr = new User("Rahul", 56);
usr.getName(); //Rahul
