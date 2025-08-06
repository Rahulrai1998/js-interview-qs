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

