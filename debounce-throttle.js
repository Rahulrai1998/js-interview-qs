const btnElm = document.querySelector(".btn");
const btnPressedCountElm = document.querySelector(".btn-pressed");
const triggeredElmDeb = document.querySelector(".increment-count-deb");
const triggeredElmThr = document.querySelector(".increment-count-thr");

let btnPressedCount = 0;
let triggeredCountDeb = 0;
let triggeredCountThr = 0;

//debounce and throttle Polyfills

const myDebounce = (callback, delay) => {
  let timer;
  return function (...args) {
    //this clears the previous timer
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

const myThrottle = (callback, delay) => {
  let last = 0;
  return function (...args) {
    let now = new Date().getTime();
    if (now - last < delay) return;
    last = now;
    return callback(...args);
  };
};

const debounce = myDebounce(() => {
  triggeredElmDeb.innerText = ++triggeredCountDeb;
}, 1800);

const throttle = myThrottle(() => {
  triggeredElmThr.innerText = ++triggeredCountThr;
}, 5000);
//LODASH USAGE
const debounceTriggeredCount = _.debounce(() => {
  triggeredElmDeb.innerText = ++triggeredCountDeb;
}, 1800);

const throttleTriggeredCount = _.throttle(() => {
  triggeredElmThr.innerText = ++triggeredCountThr;
}, 5000);

btnElm.addEventListener("click", () => {
  btnPressedCountElm.innerText = ++btnPressedCount;
  debounce();
  // debounceTriggeredCount();
  // throttleTriggeredCount();
  throttle();
});
