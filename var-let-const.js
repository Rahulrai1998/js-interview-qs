// // DIFFERENCE B/W VAR, LET AND CONST

// //SCOPE:
// console.log(a); // hoisted and initialized with undefined
// {
//   var a = 2;
//   const b = 3;
//   let c = 3;
//   console.log(a, b, c);
// }
// console.log(a); // 2 (var is function scope)
// console.log(b); // not accessible(const is block-scope)
// console.log(c); // not accessible(let is block-scope)

// //SHADOWING
// let message = "Hello";
// function greet() {
//   let message = "Hi"; // shadows the outer `message`
//   console.log(message); // Output: Hi
// }
// greet();
// console.log(message); // Output: Hello

// //LEAGAL AND ILLEGAL SHADOWING
// function test() {
//   var a = "hello";
//   let b = "goodbye";
//   if (true) {
//     let a = "hi"; // shadowing var with let: LEGAL SHADOWING
//     var b = "new"; // shadowing let with var : ILLEGAL SHADOWING
//     console.log(a);
//     console.log(b);
//   }
// }


// //DECLARATIONS (IN THE SAME SCOPE) 
// var a
// var a // CAN BE RE-DECLARED

// let a
// let a // SYNTAX-ERROR

// const a
// const a // SYNTAX-ERROR and MISSING-INITIALIZER

// //DECLARATIONS (IN DIFFERENT SCOPE)
// let a
// {
//     let a // fine
// }

//DECLARATIONS WITHOUT INITIIALIZATIONS
var a //fine
let b //fine
const c //SyntaxError: Missing initializer

