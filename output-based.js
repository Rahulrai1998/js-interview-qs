
//map,filter,reduce
let students = [
  { name: "Piyush", roll: 31, marks: 80 },
  { name: "Jenny", roll: 15, marks: 69 },
  { name: "Kaushal", roll: 16, marks: 35 },
  { name: "Dilpreet", roll: 7, marks: 55 },
];

// Q.1: Return only name of students in Capital letters
// USING for-loop, by creating new array and pushing the capitalized names
//using map()
let capitalNames = students.map((obj) => obj.name.toUpperCase());
console.log(capitalNames);

//Q.2: Return students whose marks > 60
//useing filter()
let plusSixtyMarks = students.filter((student) => student.marks > 60);
console.log(plusSixtyMarks);

//Q.3: Return sum of marks of all students
//reduce()
let marksSum = students.reduce((acc, cur) => (acc += cur.marks), 0);
console.log(marksSum);

//Q4: Return only names with marks > 60
//chain filter with map
let result = students.filter((obj) => obj.marks > 60).map((obj) => obj.name);
console.log(result);

//Q.5: Return total marks for students with marks greater than 60 after 20 marks have been added to those who scored less than 60
let resultFive = students
  .map((stu) => (stu.marks < 60 ? (stu.marks += 20) : stu.marks))
  .filter((mark) => mark > 60)
  .reduce((acc, curr) => (acc += curr), 0);
console.log(resultFive);
