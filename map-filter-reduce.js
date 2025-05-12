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


