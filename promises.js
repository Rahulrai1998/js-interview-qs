//synchronous
console.log(1);
console.log(2);
console.log(3);
//1 2 3
//asynchronous code
console.log(1);
setTimeout(() => console.log(2), 0); // will wait for 1 sec
// the setTimeout() callback is scheduled and executed after the rest of the synchronous code.
console.log(3);
//1 3 2

//Callbacks
console.log("Start");
function importantAction(username, callback) {
  setTimeout(() => {
    //the callback will auto called after 1 sec
    callback(`Give a request to ${username}`);
  }, 1000);
}
//the setTimeout() will still run after all the sync codes even if there is 0 sec passed
// const message = importantAction("Rahul Kumar"); //undefined
//using callbacks

function sendMail(time, callback) {
  setTimeout(() => {
    callback(`Send him a mail ${time}`);
  }, 1000);
}

function askForHelp(help, callback) {
  setTimeout(() => {
    callback(`Please healp me with ${help}`);
  }, 1000);
}

//NUMBERS OF NESTED CALLBACKS: CALLBACK HELL
importantAction("Rahul Kumar", function (message) {
  console.log(message);
  //sendMail() will run after above
  sendMail("Tomorrow", function (mailInfo) {
    console.log(mailInfo);
    //askForHelp() will run after above
    askForHelp("DSA", function (helpMessage) {
      console.log(helpMessage);
      askForHelp("DSA", function (helpMessage) {
        console.log(helpMessage);
        sendMail("Tomorrow", function (mailInfo) {
          console.log(mailInfo);
        });
      });
    });
  });
});
console.log("stop");

//Promises
console.log("start");
const connect = new Promise((resolve, reject) => {
  setTimeout(() => {
    const connected = true;
    if (connected) resolve("Connected to Rahul");
    else reject(new Error("Couldn't connect"));
  }, 2000);
});
console.log(connect); //Promise {<pending>}
connect.then((res) => console.log(res)).catch((err) => console.log(err));
console.log("stop");

//resolving a promise directly, it will be by default in fullfilled state
Promise.resolve("Hello Everyone").then((res) => console.log(res)); //Hello Everyone

//rejecting a promise directly
Promise.reject("New errror")
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); //New error

//Solving previous callback hell with promises
function importantActionPromise(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Give a request to ${username}`);
    }, 1000);
  });
}

function sendMailPromise(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Send him a mail ${time}`);
    }, 1000);
  });
}

function askForHelpPromise(help) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Please healp me with ${help}`);
    }, 1000);
  });
}

importantActionPromise("Rahul")
  .then((res) => {
    console.log(res);
    sendMailPromise("Night").then((res) => {
      console.log(res);
      askForHelpPromise("Core Subs").then((res) => {
        console.log(res);
      });
    });
  })
  .catch((err) => console.log(err));

//Promise chaining
importantActionPromise("Rakesh")
  .then((res) => {
    console.log(res);
    return sendMailPromise("Noon");
  })
  .then((res) => {
    console.log(res);
    return askForHelpPromise("Maths");
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

//Promise Combinators
//Promise.all()
const promiseAll = Promise.all([
  importantActionPromise("Lokesh"),
  sendMailPromise("Morning"),
  askForHelpPromise("Networks"),
]);
console.log(promiseAll); //Promise
promiseAll.then((res) => console.log(res)).catch((err) => console.log(err));
//(3) ['Give a request to Lokesh', 'Send him a mail Morning', 'Please healp me with Networks']

//Promise.race()
Promise.race([promise1, promise2, promise3])
  .then((result) => {
    // First promise to settle (resolve or reject)
  })
  .catch((error) => {
    // If the first settled promise rejects
  });

//Promise.allSettled()
const promiseSettled = Promise.allSettled([
  importantActionPromise("Tirth"),
  sendMailPromise("Noon"),
  askForHelpPromise("OS"),
]);

promiseSettled.then((res) => console.log(res)).catch((err) => console.log(err));
//(3) [{…}, {…}, {…}]
// 0: {status: 'fulfilled', value: 'Give a request to Tirth'}
// 1: {status: 'fulfilled', value: 'Send him a mail Noon'}
// 2: {status: 'rejected', reason: 'Please healp me with OS'}
// length: 3

//Promise.any()
Promise.any([promise1, promise2, promise3])
  .then((result) => {
    // First fulfilled value
  })
  .catch((error) => {
    // All promises rejected
    console.error(error.errors); // AggregateError: [reason1, reason2, reason3]
  });

// async/await
const result = async () => {
  try {
    const message1 = await importantActionPromise("Joy");
    const message2 = await sendMailPromise("Evening");
    const message3 = await askForHelpPromise("DB");
    console.log({ message1, message2, message3 });
  } catch (error) {
    console.log(error);
  }
};
result();

//1. Output
console.log("start promise new one"); //synchronous code
const prms1 = new Promise((resolve, reject) => {
  console.log(1); //synchronous code
  resolve(2); //asynchronous code
});

prms1.then((res) => {
  console.log(res); // asynchronous code
});

console.log("end promise new one"); //synchronous code
// JS executes the synchronous code first and then other callbacks/asynchronous code
//output: start 1 end 2

//2. Output
console.log("new start"); //synchronous
const prms2 = new Promise((resolve, reject) => {
  console.log(1); //sychronous
  resolve(2); //asynchronous
  console.log(3); //synchronous
});
prms2.then((res) => {
  console.log(res);
});
console.log("new end"); //synchronous
//output: start 1 3 end 2

//3. output
console.log("start");
const prms3 = new Promise((resolve, reject) => {
  console.log(1);
  console.log(3);
});
prms3.then((res) => {
  //there is no resolve in Promise
  //hence the .then block will not executed
  console.log("Text" + res); //this one is skipped
});
console.log("end");
//start 1 2 end

//4. output
console.log("start");
const fn = () => {
  new Promise((resolve, reject) => {
    console.log(1);
    resolve("success");
  });
};
console.log("middle");
fn().then((res) => {
  console.log(res);
});
console.log("end");
//start middle 1 end success

//5. output
function job() {
  return new Promise(function (resolve, reject) {
    reject();
  });
}

let prom = job();
prom
  .then(function () {
    console.log("Success 1");
  })
  .then(function () {
    console.log("Success 2");
  })
  .then(function () {
    console.log("Success 3");
  })
  .catch(function () {
    console.log("Error 1");
  })
  .then(function () {
    console.log("Success 4");
  });
//Error 1 Success 4

//6. output
function job(state) {
  return new Promise(function (resolve, reject) {
    if (state) {
      resolve("success");
    } else {
      reject("error");
    }
  });
}

let prm = job(true);

prm
  .then(function (data) {
    console.log(data);
    return job(false);
  })
  .catch(function (error) {
    console.log(error);

    return "Error Caught";
  })
  .then(function (data) {
    console.log(data);
    return job(true);
  })
  .catch(function (error) {
    return console.log(error);
  });
//success Error Caught success

//7. output
function newJob() {
  return new Promise(function (resolve, reject) {
    if (state) {
      resolve("success");
    } else {
      reject("error");
    }
  });
}

let prms = newJob(true); //resolves
prms
  .then(function (data) {
    console.log(data); //success
    return newJob(true); // resolves
  })
  .then(function (data) {
    if (data !== "victory") {
      //rejected promise
      throw "Defeat"; //stops the execution and pass the control to first catch block
    }
    return newJob(true); //skipped
  })
  .then(function (data) {
    console.log(data); //skipped
  })
  .catch(function (error) {
    console.log(error); //Defeat
    return job(false); //rejects
  })
  .then(function (data) {
    //skipped
    console.log(data);
    return newJob(true);
  })
  .catch(function (error) {
    console.log(error); //error
    return "Error caught"; //resolved promise
  })
  .then(function (data) {
    console.log(data); //Error caught
    return new Error("Test"); // resolved promise
  })
  .then(function (data) {
    console.log("Success:", data.message); //Test
  })
  .catch(function (error) {
    //skipped
    console.log("Error: ", data.message);
  });
// success-> Defeat-> error-> Error caught-> Success: Test

//8. Promise Chaining: Create a promise firstPromise which resolves to "first", then create a secondPromise which resolves to the firstPromise
const firstPromise = new Promise((resolve, reject) => {
  resolve("first");
});
const secondPromise = new Promise((resolve, reject) => {
  resolve(firstPromise);
});
secondPromise
  .then((res) => {
    return res;
  })
  .then((res) => {
    console.log(res); //first
  });

//9. Rewrite this example code using `async/await` instead of `then/catch`
/*
function loadJson(url) {
  return fetch(url).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error(res.status);
    }
  });
}
loadJson("https://fakeurl.com/data.json").catch((error) => console.log(error));
*/
async function loadJson(url) {
  const res = await fetch(url);
  if (res.status === 200) {
    return await res.json();
  }
  throw new Error(res.status);
}

//10. Take array of promises in the function and resolve them recursively
const promiseOne = new Promise((resolve, reject) => {
  resolve("Promise One");
});
const promiseTwo = new Promise((resolve, reject) => {
  resolve("Promise Two");
});
const promiseThree = new Promise((resolve, reject) => {
  resolve("Promise Three");
});

function promiseRecur(promisesArray) {
  if (promisesArray.length === 0) return;
  const temp = promisesArray.shift(); //will take out 0th element and modify the original array on each iteration
  temp.then((res) => console.log(res)).catch((error) => console.log(error));
  promiseRecur(promisesArray); // remaining elements of array will be passed
}
promiseRecur([promiseOne, promiseTwo, promiseThree]);

//11. Promise Polyfill
function myPromise(executor) {
  let onResolve,
    onReject,
    isRejected = false,
    isFulfilled = false,
    isCalled = false,
    value;

  function resolve(val) {
    isFulfilled = true;
    value = val;
    //following code handles sync ops passed in promise constructor
    //onResolve won't invoke since it won't be initialized with a function, in case of sync operations.
    if (typeof onResolve === "function") {
      onResolve(val);
      isCalled = true;
    }
  }

  function reject(val) {
    isRejected = true;
    value = val;
    if (typeof onReject === "function") {
      onReject(val);
      isCalled = true;
    }
  }

  //here this refers to the instance/object of myPromise created using new keyword
  this.then = function (callback) {
    onResolve = callback;

    //following code handles sync operations passed in Promise constructor
    if (isFulfilled && !isCalled) {
      isCalled = true;
      onResolve(value);
    }
    return this;
  };

  this.catch = function (callback) {
    onReject = callback;
    if (isRejected && !isCalled) {
      isCalled = true;
      onReject(value);
    }
    return this;
  };

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

//since we are using 'new' keyword, myPromisePol is treated as a constructor
//and, promisePol is holding an object, returned by the contructor.
//hence, using 'this' inside the myPromise() refers to the object created by it.
const promisePol = new myPromise((resolve, reject) => {
  setTimeout(() => reject("Promise Rejected"), 1000);
  // resolve(2)
});
//here, 'then' and 'catch' methods are bound inside the object using 'this' keyword.
promisePol.then((res) => console.log(res)).catch((error) => console.log(error));

//Polyfill of Promise.resolve()
myPromise.resolve = (val) => {
  return new myPromise(function executor(resolve, reject) {
    resolve(val);
  });
};
//here, resolve() is static method for out promise polyfill
//static methods don't need instances to be called.
myPromise.resolve("new promise").then((res) => console.log(res));

//Polyfill of Promise.reject()
myPromise.reject = (val) => {
  return new myPromise((resolve, reject) => {
    reject(val);
  });
};

myPromise
  .reject("I am rejected")
  .then((res) => console.log(res))
  .catch((error) => console.log(error));
