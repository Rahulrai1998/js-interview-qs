//Objects

const user = {
  name: "Rakesh Ramesh",
  age: 24,
  "We learn Objects": true,
};

delete user.age;
console.log(user);
console.log(user["We learn Objects"]); //true
delete user["We learn Objects"];

//Interview Questions
const func = (function (a) {
  delete a; // only works with objects
  return 5;
})(5);

console.log(func); //5
