const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  getExchangeRate();
});
window.addEventListener("load", () => {
  getExchangeRate();
});
function getExchangeRate() {
  let amount = document.querySelector(".amount input");
  const msg = document.querySelector(".msg");
  let amtval = amount.value;
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }
  msg.innerText = "Getting Exchange Rate.......";
  const URL = `https://v6.exchangerate-api.com/v6/efbb35059d79f0dd5ebd7573/latest/${fromCurrr.value}`;
  fetch(URL)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurr.value];
      let totalExchangeRate = (amtval * exchangeRate).toFixed(2);
      msg.innerText = `${amtval} ${fromCurrr.value}= ${totalExchangeRate} ${toCurr.value}`;
    })
    .catch(() => {
      msg.innerText = "Something went wrong...!";
    });
}
