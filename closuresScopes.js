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

//3. How to leverage closure for time optimation of following code
function find(index) {
  let a = [];
  for (let i = 0; i < 1000000; i++) {
    a[i] = i * i;
  }
  console.log(a[index]);
}
//Below calls will execute the whole for-loop each time
find(6);
find(12);

function find() {
  let a = [];
  for (let i = 0; i < 1000000; i++) {
    a[i] = i * i;
  }
  //ABOVE CODE SNIPPET RUNS EACH TIME THE find() is called
  // we will call it once and then we will get our desired value every time using closures. Without executing the whole loop every time.
  return function (index) {
    console.log(a[index]);
  };
}
let closure = find(); // this will run the loop once and set the array values
//Below code will simply utilize the already computed array above
closure(6);
closure(12);

//4. Block scope and setTimeout()
for (var i = 0; i < 3; i++) {
  setTimeout(function log() {
    console.log(i); //what is logged?
  }, 1000); // 3 3 3, after every 1 sec
}
//What is happening
// - 3 callbacks are scheduled/started on 3 iterations
// - since, var is not block scoped same i will be shared for every callback
// hence by the time setTimeout starts executing the value of i becomes 3
// and it prints 3 only

//we can use closures or let to make seperate block for i on every iterations
// this way every setTimeout will be having the current value of i

// using IIFE/closure
for (var i = 0; i < 3; i++) {
  //the following function will create a seperate scope with current value of i on every iteration
  (function (i) {
    setTimeout(function log() {
      console.log(i); // 0 1 2, after every 1 sec
    }, 1000);
  })(i);
}

//using let
//let is block scoped and on every iteration there will be new block with current value of i
for (let i = 0; i < 3; i++) {
  setTimeout(function log() {
    console.log(i); // 0 1 2, after every 1 sec
  }, 1000);
}

//5. Use closure to create a private counter
function counter() {
  // we use private variable and will access using closures
  var _counter = 0;
  function add(incr) {
    return (_counter += incr);
  }
  function retrive() {
    return _counter;
  }
  return { add, retrive };
}
// initialized the counter variable
const privateCounter = counter();
//manipulating and accessing the private counter using the functions rather directly
privateCounter.add(10);
privateCounter.add(20);
console.log(privateCounter.retrive());

//6. What is Module Pattern?
const myModule = (function () {
  //Private variables
  let privateVariable = "I am Private";
  //Private function
  function privateFunction() {
    console.log(privateVariable);
  }
  //Public function
  //Can be uses to  access private members
  function publicFunction() {
    privateFunction();
    console.log("This is a public method");
  }

  // return the public interface
  return {
    publicFunction,
  };
})();

// Access the public method
myModule.publicFunction(); // I am Private This is a public method

//7. Make this run only once, in case if called multiple times
// let view;
// function likeTheVideo() {
//   view = "Rahul Kumar";
//   console.log("Hello ", view);
// }
//Will run multiple times
// likeTheVideo();
// likeTheVideo();

let view;
function likeThisVideo() {
  let count = 0;
  return function () {
    if (count > 0) console.log("Already run");
    else {
      view = "Rahul Kumar";
      console.log("Hello ", view);
      count++;
    }
  };
}

let isViewd = likeThisVideo();
isViewd(); //Hello Rahul Kumar
isViewd(); // Already run
isViewd(); //Already run
