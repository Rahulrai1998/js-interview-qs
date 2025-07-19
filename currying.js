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
console.log(multiply(1)(9)); //9
console.log(multiply(2)(6)); //12

//3. Infinite currying: sum(1)(2)(3)...(n)
//implement add(5)(2)(4)(5)()
// we use recursion here.
function add(a) {
  return function (b) {
    if (b) return add(a + b); // recursive call
    else return a;
  };
}

console.log(add(5)()); //5
console.log(add(5)(6)()); //11
console.log(add(5)(2)(4)(5)()); //16, we can add any number of args in add

//4. Currying vs Partial Application

//Currying: transforms a function of n arguments into n nummber of functions with 1 argument each. It is strictly followed

//Partial Application: In this there could be less number of functions than the arguments.

//example of partial application
function addPartial(a) {
  return function (b, c) {
    return a + b + c;
  };
}

const x = addPartial(10);
console.log(x(11, 78));
//or
console.log(addPartial(10)(11, 78));

//5. Real life example of currying: DOM manipulation
function updateElementText(id) {
  return function (content) {
    document.querySelector("#" + id).textContent = content;
  };
}

const updateHeader = updateElementText("header");
updateHeader("See yaa");
updateHeader("Nice T-shirt");

//6. curry() implementation
//which converts f(a,b,c) into f(a)(b)(c)

function curry(func) {
  return function curriedFunc(...args) {
    if (args.length >= func.length) return func(...args);
    else {
      //following function will be returned every time to accept next argumment
      //in case, args.length >= func.length.
      //then again the curriedFunc is called with new collection of args
      //i.e args+next.
      //it will run until  args+next == all the args
      return function (...next) {
        return curriedFunc(...args, ...next);
      };
    }
  };
}

const sumToCurry = (a, b, c, d) => a + b + c + d;
const totalSum = curry(sumToCurry);

const passA = totalSum(1);
console.log(passA);
//returns following function, hence pass next arg
// ƒ (...next) {
//         return curriedFunc(...args, ...next);
//       }
const passB = passA(6);
console.log(passB); // again returns the same function, to pass the next arg

//so we can write like this
console.log(totalSum(1)(6)(5)(6)); //18

//7. Write a function curry() that converts f(a,b,c) into a curried function f(a)(b)(c) with placeholder ( _ ) support.
