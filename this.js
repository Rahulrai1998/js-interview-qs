//implicit and explicit object bindings

//IMPLICIT
const user = {
  name: "Rahul",
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
};
user.greet(); // Hi, I'm Rahul

//EXPLICIT
function greet() {
  console.log(`Hi, I'm ${this.name}`);
}
const person = { name: "Rahul" };
greet.call(person);   // Hi, I'm Rahul
greet.apply(person);  // Hi, I'm Rahul
const boundGreet = greet.bind(person);
boundGreet();         // Hi, I'm Rahul