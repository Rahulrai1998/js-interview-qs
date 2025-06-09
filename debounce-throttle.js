const btnElm = document.querySelector(".btn");
const btnPressedCountElm = document.querySelector(".btn-pressed");
const triggeredElmDeb = document.querySelector(".increment-count-deb");
const triggeredElmThr = document.querySelector(".increment-count-thr");

let btnPressedCount = 0;
let triggeredCountDeb = 0;
let triggeredCountThr = 0;

//debounce and throttle Polyfills


//LODASH USAGE
const debounceTriggeredCount = _.debounce(() => {
  triggeredElmDeb.innerText = ++triggeredCountDeb;
}, 1800);

const throttleTriggeredCount = _.throttle(() => {
  triggeredElmThr.innerText = ++triggeredCountThr;
}, 5000);

btnElm.addEventListener("click", () => {
  btnPressedCountElm.innerText = ++btnPressedCount;
  debounceTriggeredCount();
  throttleTriggeredCount();
});
