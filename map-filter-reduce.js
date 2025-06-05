// map, filter and reduce

//map()
const nums = [1, 2, 3, 4];
const multiplyThree = nums.map((element, index, array) => {
  return element * 3;
});
console.log(multiplyThree); //[3, 6, 9, 12]

//filter()
const moreThanTwo = nums.filter((element, index, array) => {
  return element > 2;
});
console.log(moreThanTwo); //[3, 4]

//reduce
const sumOfEelements = nums.reduce(
  (accumulator, currentValue, index, array) => {
    return accumulator + currentValue;
  },
  0
);
console.log(sumOfEelements); // 10

//Polyfill
//map()

//Array.map((element,index,array)=>{})
Array.prototype.customMap = function (callBackFunction) {
  //EMPTY ARRAY TO RETURN NEW ARRAY
  let newArray = [];
  //ITERATION OVER THE ELEMENTS AND APPLY CALLBACK FUNCTION
  for (let index = 0; index < this.length; index++) {
    //this = ACTUAL ARRAY
    newArray.push(callBackFunction(this[index], index, this));
  }
  return newArray;
};

const customMapResult = nums.customMap((element, index, array) => {
  return element * 3;
});
console.log(customMapResult); //[3, 6, 9, 12]

//filter()
//Array.filter((element,index,array)=>{})
Array.prototype.customFilter = function (callBackFunction) {
  //EMPTY ARRAY TO RETURN NEW ARRAY with condition passed elements
  let newArray = [];
  //ITERATION OVER THE ELEMENTS AND APPLY CALLBACK FUNCTION
  for (let index = 0; index < this.length; index++) {
    //this = ACTUAL ARRAY
    if (callBackFunction(this[index], index, this) === true) {
      newArray.push(this[index]);
    }
  }
  return newArray;
};

const customFilterResult = nums.customFilter((element, index, array) => {
  return element > 2;
});
console.log(customFilterResult); //[3, 4]

//reduce()
//Array.reduce((accumulator,currentElement,index,array)=>{},initialValue)
Array.prototype.customReduce = function (callBackFunction, initialValue) {
  //INITIALIZE ACCUMULATOR WITH initialValue
  let accumulator = initialValue;
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
  }
};
