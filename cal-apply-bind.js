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
