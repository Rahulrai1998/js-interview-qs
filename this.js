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

//1. output
const userOne = {
  firstName: "Rahul",
  getName() {
    const firstName = "Ramesh";
    return this.firstName;
  },
};
console.log(userOne.getName()); //Rahul

//2. what is the result of ref?
function makeUser() {
  return {
    name: "Alok",
    ref: this, //here 'this is pointing to the Window object'
  };
}
console.log(makeUser().ref.name); //prints NOTHING

//3. fix above
function makeUserFix() {
  return {
    name: "alok",
    //ref function is already inside an object
    ref() {
      return this; //here 'this' will point to the current parent object
    },
  };
}
console.log(makeUserFix().ref().name); //alok

//4. output
const userTwo = {
  name: "Harish",
  logMessage() {
    console.log(this.name);
  },
};

//The callback function is the copy of object function, hence the copy has no context rather than Window obj.
setTimeout(userTwo.logMessage, 1000); //logMessage is not called instead it is passed as a callback, hence nothing happens
setTimeout(userTwo.logMessage(), 1000); //Harish

//5. output
const userThree = {
  name: "Goyal",
  greet() {
    return `Hello,${this.name}`;
  },
  farewell: () => `Goodbye, ${this.name}`, //'this' refers to outer scope/Window obj
};
console.log(userThree.greet()); //Hello,Goyal
console.log(userThree.farewell()); //Goodbye, NOTHING, due to arrow function

//6. Create an object calculator
let calculator = {
  read() {
    this.a = +prompt("a = ", 0);
    this.b = +prompt("b = ", 0);
  },
  sum() {
    return this.a + this.b;
  },
  mul() {
    return this.a * this.b;
  },
};

calculator.read();
console.log(calculator.sum());
console.log(calculator.mul());

//7. Output
var length = 4;
function callback() {
  console.log(this.length);
}
const object = {
  length: 5,
  //method() will target to object
  method(fn) {
    fn(); // fn() is inside the method() and it is a callback, hence it targets the global obj
  },
};

object.method(callback); //4, callback functions run as a regular function hence, 'this' inside a callback function always refers to global/window object

//8. output
var length = 6;
function callback() {
  console.log(this.length);
}
const newObject = {
  length: 8,
  method() {
    //arguments = [callback,4,6]
    //here, arguments is an array like object, not entirely an array, hence the 'this' of callback refers to arguments object.
    //arguments object already has a length: 3, hence, this length value is printed
    console.log(arguments);
    arguments[0]();
  },
};

newObject.method(callback, 4, 6); //3

//9. Implement calc
// const result = calc.add(10).multiply(5).subtract(30).add(10);
// console.log(result.total);
const calc = {
  // total: 0,
  add(n) {
    this.total += n;
    return this;
  },
  multiply(n) {
    this.total *= n;
    return this;
  },
  subtract(n) {
    this.total -= n;
    return this;
  },
};

const result = calc.add(10).multiply(5).subtract(30).add(10);
console.log(result.total);
