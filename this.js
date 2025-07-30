//implicit and explicit object bindings

//IMPLICIT
const user = {
  name: "Rahul",
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  },
};
user.greet(); // Hi, I'm Rahul

//EXPLICIT
function greet() {
  console.log(`Hi, I'm ${this.name}`);
}
const person = { name: "Rahul" };
greet.call(person); // Hi, I'm Rahul
greet.apply(person); // Hi, I'm Rahul
const boundGreet = greet.bind(person);
boundGreet(); // Hi, I'm Rahul

//here this refers to the GLOBAL OBJECT
this.a = 5;
console.log(this.a); //5
console.log(this); //Window/Global Object

//'this' inside a method/ normal function
const userThis = {
  name: "Ramesh Prasad",
  age: 56,
  //normal function
  getAge() {
    console.log(this.age); // here this refers to the immediate parent object i.e userThis
  },
};
userThis.getAge(); // 56

const data = {
  name: "Prabha",
  address: {
    city: "Kolkata",
    getCity() {
      console.log(this.city, this.name); // name is not in the immediate parent object, hence it will return undefined
    },
  },
};
data.address.getCity(); //Kolkata undefined

//'this' inside an arrow function
