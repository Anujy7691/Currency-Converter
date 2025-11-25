const BASE_URL =
  "https://api.currencyapi.com/v3/latest?apikey=cur_live_cMkNew2PnweO5wiqZlTzCijSE7ck267eelix0dj8";
const dropdownSelect = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");
let currencyData = null;

for (let select of dropdownSelect) {
  for (let currCode in countryList) {
    let newOpt = document.createElement("option");
    newOpt.innerText = currCode;
    newOpt.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOpt.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOpt.selected = "selected";
    }
    select.append(newOpt);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

//Api of  flagsapi
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

//Fast Loading
async function loadRates() {
  if (!currencyData) {
    let URL = `${BASE_URL}`;
    let response = await fetch(URL);
    currencyData = await response.json();
  }
  return currencyData;
}

//Converting and Exchnging the amount
const updateExchangeRate = async () => {
  let amount = document.querySelector("#amount");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  let data = await loadRates();
  let rateFrom = data.data[fromCurr.value].value;
  let rateTo = data.data[toCurr.value].value;
  let usdAmount = amtVal / rateFrom;
  let finalAmount = (usdAmount * rateTo).toFixed(2);
  msg.innerText = `${amtVal}${fromCurr.value} = ${finalAmount}${toCurr.value}`;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
