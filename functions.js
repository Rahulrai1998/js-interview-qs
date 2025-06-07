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
  console.log(fun(5) + 3);
}
display(sqr);

//IIFE
(function sqr(num) {
  console.log(num * num);
})(5); //25

// O/P-based question
(function (x) {
  return (function (y) {
    console.log(x);
  })(2);
})(1); // 1, it happens b/c of closure

for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
} // prints 0-5 , as let is block scoped.
//In ES6, let is block-scoped, which means a new binding of i is created for each iteration of the loop.

for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
} // prints 5 times 5 as var is function scoped

function scope() {
  console.log(a, b);
  {
    var a = 1;
    let b = 3;
  }
}

scope();


//Both works fine
fun(); //5
function fun() {
  console.log(5);
}
fun(); //5


// o/p-based questions
