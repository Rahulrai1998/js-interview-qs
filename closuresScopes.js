// Closures and Scopes
//Example of closures
function outer() {
  const test = "Rahul";

  //the inner() is a closure
  return function inner() {
    console.log(test);
  };
}

const fun = outer();
fun(); // this function can access the outer scoped variable

//Example 2
//global scope
function subscribe() {
  //inner scope 2
  var name = "Rahul";
  //displayName() is a closure
  return function displayName() {
    //inner scope
    // alert(name);
  };
}
const fun2 = subscribe();
fun2();

function makeFunc() {
  var name = "Mozilla";
  return function displayName(num) {
    console.log(name, num);
  };
}

makeFunc()(10); //currying

// closure scope-chain
// global scope
const e = 10;
function sum(a) {
  return function (b) {
    return function (c) {
      // outer functions scope
      return function (d) {
        // local scope
        return a + b + c + d + e;
      };
    };
  };
}

console.log(sum(1)(2)(3)(4)); // 20

//OUTPUT-BASED Qs
//1. What will be logged?
let count = 0;
(function printCount() {
  if (count === 0) {
    let count = 1; // shadowing
    //let is block scope, hence count = 1 only inside this block
    console.log(count); // 1
  }
  //outside the block, count = 0
  console.log(count); // 0
})();

//2. Wrtie a function that allow you to do this
// var addSix = createBase(6);
// addSix(10); returns 16
// addSix(21); returns 27

function createBase(num) {
  return function (x) {
    return x + num;
  };
}
var addSix = createBase(6);
console.log(addSix(10)); //16
console.log(addSix(21)); //27
