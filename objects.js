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
