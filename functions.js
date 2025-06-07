//Functions in JS

// storing a function in a variable is called Function Expression
// following function assigned to the variable is called ANONYMOUS FUNCTION as it has no name
const square = function (num) {
  return num * num;
};

//first class function
function sqr(num) {
  return num * num;
}
function display(fun) {
  //   console.log(fun(5) + 3);
}
display(sqr);

//IIFE
(function sqr(num) {
  //   console.log(num * num);
})(5); //25

// O/P-based question
(function (x) {
  return (function (y) {
    // console.log(x);
  })(2);
})(1); // 1, it happens b/c of closure

for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    // console.log(i);
  }, i * 1000);
} // prints 0-5 , as let is block scoped.
//In ES6, let is block-scoped, which means a new binding of i is created for each iteration of the loop.

for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    // console.log(i);
  }, i * 1000);
} // prints 5 times 5 as var is function scoped

function scope() {
  //   console.log(a, b);
  {
    var a = 1;
    let b = 3;
  }
}

scope();

//Both works fine
// fun(); //5
// function fun() {
//   console.log(5);
// }
// fun(); //5

// o/p-based questions
//tell output of console.log()
var x = 21;
var fun = function () {
  console.log(x); // undefined, because of hoisting in the local scope
  var x = 10;
};
fun();

//spread vs rest operators
function multiply(...arr) {
  //rest operator: refers to array of passed arguments
  console.log(arr[0] * arr[1]);
}
var arr = [5, 6];
multiply(...arr); // spread operator: spread elements of the array

// o/p-based questions
//tell output of console.log()
const fn = (a, x, y, ...rest) => {
  console.log(x, y, rest); //6 7 [8, 9, 10]
};
fn(5, 6, 7, 8, 9, 10);

//callback functions examples: all built-in array methods and event-listeners
document.addEventListener("click", function () {
  console.log("test");
});
[1, 2, 2].map((arr) => {
  console.log(arr);
});

//normal function vs arrow function
//1. Syntax
function sqr(num) {
  return num * num;
}

const sqr = (num) => {
  return num * num;
};

// 2. Implicit return keyword
const sqr = (num) => num * num; // In normal function return keyword is must

//3. arguments keyword
function sqr() {
  console.log(arguments); //[2,3], without passing params we get the arguments
}
sqr(2, 3);

const sqr = () => {
  console.log(arguments); //ReferenceError
};
sqr(2, 3);

//4. this keyword
// normal function points to the current local object
// arrow function points to the global object

let user = {
  username: "Rahul Kumar",
  funArrow: () => {
    console.log(this.username);
  },
  funNormal() {
    console.log(this.username);
  },
};

user.funArrow(); //undefined
user.funNormal(); // Rahul Kumar
