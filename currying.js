//currying
// example f(a,b) -> f(a)(b)

// Regular function
function add(a, b) {
  return a + b;
}

// Curried version
function curriedAdd(a) {
  return function (b) {
    return a + b;
  };
}
const add5 = curriedAdd(5); // returns a function
console.log(add5(3)); // 8

function fun(a) {
  return function (b) {
    console.log(a, b);
  };
}
fun(5)(6); //5 6

//1. implement sum(2)(6)(1)
function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
console.log(sum(2)(6)(1));

//2. Implement a evaluate()
/* 
evaluate("sum")(4)(2) => 6
evaluate("multiply")(4)(2)=>8
evaluate("divide")(4)(2)=>2
evaluate("substract")(4)(2)=>2

*/

function evaluate(ops) {
  return function (a) {
    return function (b) {
      if (ops === "sum") return a + b;
      else if (ops === "sub") return a - b;
      else if (ops === "mul") return a * b;
      else if (ops === "div") return a / b;
      else return "Invalid ops";
    };
  };
}

console.log(evaluate("div")(8)(4)); //2
console.log(evaluate("sum")(9)(5)); //14
console.log(evaluate("non")(4)(8)); //invalid ops

//reuse multiply arg for diff args
const multiply = evaluate("mul");
console.log(m)
