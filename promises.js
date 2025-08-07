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
