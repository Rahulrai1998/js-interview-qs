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
