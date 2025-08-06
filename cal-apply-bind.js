//Explicit binding of this: call, bind, apply
//1. What is call?
//funtion gets called immediately
function sayHello(age, address) {
  return "Hello " + this.name + " from " + address + " with age " + age;
}
var obj = { name: "Rahul" };

//call() ties the obj with function with list of arguments
console.log(sayHello.call(obj, 23, "Patna"));

//2. apply()
// it takes function arguments as array
//funtion called immediately
console.log(sayHello.apply(obj, ["Rahul", 82]));

//3. bind()
//it doesn't invokes the function immediately
//returns a new function
//we call the function later on with remaining args

const hello = sayHello.bind(obj, 23);
console.log(hello("Rahul"));
//it's a reusable function
console.log(hello("Kolkata"));

//4. output
const person = { name: "Joy" };
function sayHi(age) {
  return `${this.name} is ${age}`;
}
console.log(sayHi.call(person, 24)); //Joy is 24
console.log(sayHi.bind(person, 32)); //ƒ sayHi(age) {return `${this.name} is ${age}`;}

//5. call() with function inside an object
const age = 10;
var personNew = {
  name: "Vipul",
  age: 20,
  getAge: function () {
    //here 'this' will point over the explicitly bounded object
    return this.age;
  },
};
var newPerson = { age: 26 };
console.log(personNew.getAge.call(newPerson)); //26

//6. output
var status = "Nice";
setTimeout(() => {
  const status = "Noob";
  const data = {
    status: "Sad",
    getStatus() {
      return this.status;
    },
  };

  console.log(data.getStatus());

  console.log(data.getStatus.call(this)); //Nice
  //here this points to the outer/global object
  //'this' inside a function points to the context of the function.
  //in this case the context is global object
}, 0);

//7. call printAnimals such that it prints all animals object.
const animals = [
  { species: "Lion", name: "King" },
  { species: "Whale", name: "Queen" },
];

function printAnimals(i) {
  this.print = function () {
    console.log("#" + i + " " + this.species + ": " + this.name);
  };
  this.print();
}
animals.forEach((obj, i) => {
  printAnimals.call(obj, i);
});

//8. append an array to another array
const array = ["a", "b"];
const elements = [0, 1, 2];

array.concat(array, elements); //this will return a new array instead modifying the original

array.push.apply(array, elements); //here we are setting the context of push() fun to array and passing second array as args
console.log(array); //['a', 'b', 0, 1, 2]

//9. Using apply to enhance built-in functions
//a. Find min/max number in the array
const numbers = [5, 6, 2, 3, 7];
console.log(Math.max(...numbers)); // 7
console.log(Math.min(...numbers)); // 2
//using apply()
console.log(Math.max.apply(null, numbers)); //7
console.log(Math.min.apply(null, numbers)); //2

//10. Bound function
function f() {
  console.log(this);
}
let user = {
  g: f.bind(null), //the context of this f is hard-fixed using bind()
};
user.g(); //Window object

//11. Bind chaining
function f() {
  console.log(this.name);
}

//here f is once bound to first obj it will always remain same
//bind chaining doesn't work
f = f.bind({ name: "John" }).bind({ name: "Ann" });
f(); //John

//12. fix the checkPassword() to make the code work
function checkPassword(success, failed) {
  let password = prompt("Password?", "");
  if (password == "Rahul Kumar") success();
  else failed();
  //here failed and success functions are called inside another function
  //hence the 'this' inside these functions def will ony point over the context of its parent funtion
  //in this case it it Window obj and not the userNew obj
  //hence, to work properly we need to bind the userNew obj while passing as callback
}
let userNew = {
  name: "Rahul Kumar",
  loginSuccessfull() {
    console.log(`${this.name} logged in`);
  },
  loginFailed() {
    console.log(`${this.name} failed to log in`);
  },
};
// checkPassword(userNew.loginSuccessfull, userNew.loginFailed); // fix this
checkPassword(
  userNew.loginSuccessfull.bind(userNew),
  userNew.loginFailed.bind(userNew)
);

//13. Partial Application for login function
//Complete the checkPassword(?,?)
function checkPass(ok, fail) {
  let password = prompt("Password?", "");
  if (password == "Road") ok();
  else fail();
}
let newUser = {
  name: "Rakesh Jay",
  login(result) {
    console.log(this.name + (result ? "login successfull" : "login failed"));
  },
};

// checkPass(?,?)
checkPass(
  newUser.login.bind(newUser, true),
  newUser.login.bind(newUser, false)
);

//14. Explicit binding with arrow function
const ageNew = 10;

var personArrow = {
  name: "Rahul",
  age: 20,
  getAgeArrow: () => console.log(this.age),
  getAge: function () {
    console.log(this.age);
  },
};

var person2 = { age: 24 };
personArrow.getAge.call(person2); //20
personArrow.getAgeArrow.call(person2); //undefined
//explicit binding won't work with arrow function

//15. call() polyfill
let car1 = {
  color: "Red",
  company: "Ferrari",
};

function purchaseCar(currency, price) {
  console.log(
    `I have purchased ${this.color} - ${this.company} car for ${currency}${price}`
  );
}

//purchaseCar.call(car1, "rupee", 1000000);

Function.prototype.myCall = function (context = {}, ...args) {
  //edge cases
  if (typeof this !== "function") throw new Error(this + "It's not callable");

  //embed the function to passed object
  context.fn = this; //here this refers to the function on which myCall() mehtod will be bound
  //now call the function using passed args
  context.fn(...args);
};
purchaseCar.myCall(car1, "$", 56000);

//16 apply() polyfill
let shop = {
  name: "Zara",
  city: "Kolkata",
};

function buyShirt(currency, size) {
  console.log(
    `I have bought a shirt from ${this.name} at ${this.city} of ${currency}1000 of size ${size}`
  );
}
// buyShirt.apply(shop, ["$", "M"]);
Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== "function") throw new Error(`${this} is not a function`);
  if (!Array.isArray(args))
    throw new Error("CreateListFromArrayLike called on non-object");

  context.fn = this;
  context.fn(...args);
};
buyShirt.myApply(shop, ["$", "S"]);

//17. bind() polyfill
let travel = {
  city: "Shrinagar",
  country: "India",
};

function travelTo(transport, budget) {
  console.log(
    `I travelled to ${this.city} in ${this.country} via ${transport} only with ${budget} rupees`
  );
}
// const fn = travelTo.bind(travel, "Plane", 254000);
// fn();
Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this !== "function") throw new Error(`${this} it is not callable`);
  context.fn = this;
  return function (...restArgs) {
    return context.fn(...args, ...restArgs);
  };
};
const fn = travelTo.bind(travel, "Train");
fn(1000000);
