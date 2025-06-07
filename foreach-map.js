const arr = [1, 2, 3];
const result = arr.forEach((elem) => {
  elem + 2;
});

//THIS WILL MODIFY ORIGINAL ARRAY
const modify = arr.forEach((elem, i) => {
  arr[i] += elem + 3;
});

console.log(result); //undefined
console.log(arr); //[5,6,9]
