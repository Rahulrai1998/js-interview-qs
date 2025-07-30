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

//Dynamically add key:value in data object
const place = "City";
const cityname = "Patna";
const data = {
  id: 1,
  [place]: cityname,
};

console.log(data, data.City);

//Iterate the obj
for (key in data) {
  console.log(data[key]);
}

//Interview Questions
//1. Tell output
const obj = {
  a: "one", //this will be overriden by "three"
  b: "two",
  a: "three",
};
console.log(obj); //{a: 'three', b: 'two'}

//2. Create a function multiplyByTwo(obj) that multiplies all numeric property values of nums by 2
const nums = {
  a: 100,
  b: 200,
  title: "My nums",
};

function multiplyByTwo(obj) {
  for (key in obj) {
    if (typeof obj[key] === "number") obj[key] *= 2;
  }
}
multiplyByTwo(nums);
console.log(nums); //{a: 200, b: 400, title: 'My nums'}

//3. Output
const a = {};
const b = { key: "b" }; //it is an object, so it won't be assigned as key as it is
const c = { key: "c" }; //hence, it will convert into "[object Object]" first

a[b] = 123; //{[object Object]: 123}
a[c] = 456; //{[object Object]: 456}
console.log(a); //{[object Object]: 456}

//4. JSON.stringify() and JSON.parse()
const newObj = {
  name: "Ramesh",
  age: 78,
};
const strng = JSON.stringify(newObj);
console.log(strng); //"{"name":"Ramesh","age":78}" : object to string
console.log(JSON.parse(strng)); //{name: 'Ramesh', age: 78} : string to object

//USAGE
//1. localStorage: we store values in the form of string only, hence stringigy is used to
// convert and store and then parse is used to retrieve the value back into object form.
//2. Data Transfer: for sending data over http protocols we first stringify data then
// we parse it as per usage.

localStorage.setItem("data", strng); //"data":"{"name":"Ramesh","age":78}"
console.log(JSON.parse(localStorage.getItem("data"))); //{name: 'Ramesh', age: 78}

//5. Output
console.log([..."Lydia"]); //(5) ['L', 'y', 'd', 'i', 'a']

//6. Output
const newUser = { name: "Lydia", age: 21 };
const admin = { admin: true, ...newUser };
console.log(admin); //{admin: true, name: 'Lydia', age: 21}

//7. Output
const settings = { username: "Rahul", level: 45, health: 80 };
//will only stringify level and health
const dataNew = JSON.stringify(settings, ["level", "health"]);
console.log(dataNew); //{"level":45,"health":80}

//8.Output
const shape = {
  radius: 10,
  //Normal function 'this' referes to the current object
  diameter() {
    return this.radius * 2;
  },
  //arrow function 'this' refers to the outer/global/window object
  perimeter: () => 2 * Math.PI * this.radius,
};
console.log(shape.diameter()); // 20
console.log(shape.perimeter()); //NaN

//Destructuring in objects
let userNew = {
  name: "Pratik",
  age: 24,
  address: {
    city: "Patna",
    state: "Bihar",
  },
};

const name = "Test name";
const {
  name: objName,
  age,
  //nested destructuring
  address: { city },
} = userNew;
console.log(objName); // Pratik
console.log(city); //Patna

//9. Output
function getItems(fruitList, favouriteFruit, ...args) {
  return [...fruitList, ...args, favouriteFruit];
}
console.log(getItems(["banana", "apple"], "pear", "orange")); //['banana', 'apple', 'orange', 'pear']

//10. Object Referencing, Output
let greet = { greeting: "Hii" };
let newGreet;
//SHALLOW COPY IS MADE
newGreet = greet; // new variable will point to the same memory address as greet
greet.greeting = "New Hii";
console.log(newGreet.greeting, greet);

//11. Output
//in JS objects are only equal if their references are same
//in this example each obj hold different addresses despite the same value
console.log({ a: 1 } == { a: 1 }); // false
console.log({ a: 1 } === { a: 1 }); //false

//12. output
let person = { name: "Lydia" };
const members = [person];
// person = null; // it won't change the array value
person.name = null; // it will affect the array
console.log(members); // [{name:null}]

//13. Output
const value = { number: 10 };
//spread operator clones the object, by making shallow copy of it rather than assigning reference. Hence there is not affect on original object on modifying the clone
const multiply = (x = { ...value }) => {
  console.log((x.number *= 2));
};

multiply(); //20, will use default value
multiply(); //20, will use default value
multiply(value); //20, pass by reference
multiply(value); //40, pass by reference

//14. Output
function changeAgeAndReference(person) {
  //memory address of personObj1 is copied into person para
  person.age = 25; // it changes the original array
  //now the person is pointing over new memory address, but personObj1 is still intact
  person = {
    name: "Raj",
    age: 56,
  };
  return person;
}
const personObj1 = {
  name: "Alex",
  age: 25,
};
const personObj2 = changeAgeAndReference(personObj1); // reference is passed
console.log(personObj1); //{name: 'Alex', age: 25}
console.log(personObj2); //{name: 'Raj', age: 56}

//shallow and deep copy
const original = { name: "Alex", address: { city: "Delhi" } };

// Shallow copy
const shallow = { ...original };
shallow.address.city = "Mumbai";

//here, city property still pointing over the address of original object's reference.
console.log(original.address.city); // "Mumbai" — shared reference!

// Deep copy
const deep = JSON.parse(JSON.stringify(original));
deep.address.city = "Kolkata";

console.log(original.address.city); // "Mumbai" — unaffected

//15. How to deep copy or clone an object
let origin = {
  name: "Rahul Kumar",
  age: 25,
  address: {
    city: "Patna",
  },
};

//1st way, shallow copy only
const originClone = Object.assign({}, origin);
originClone.name = "Ramesh"; // it won't affect the origin object name
originClone.address.city = "Kolkata"; //It wil affect the nested address of origin obj
console.log(origin.address.city); //Kolkata

//2nd way, shallow copy
const spreadCopy = { ...origin }; // same behaviour as above

//deep copy
const deepClone = JSON.parse(JSON.stringify(origin));
deepClone.address.city = "New York"; // it won't affect the origin's nested object
console.log(origin.address.city); //Kolkata
