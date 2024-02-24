const cash = document.getElementById("cash");
const priceTag = document.getElementById("price");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const cashRegister = document.getElementById("cash-register");

let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];
priceTag.textContent = price.toFixed(2);
cid.forEach((money) => {
  cashRegister.innerHTML += `<p>${money[0]}: <span>$${money[1].toFixed(
    2
  )}</span></p><hr>`;
});
const hunCid = [];
for (let i = 0; i < cid.length; i++) {
  hunCid.push([cid[i][0], Number(cid[i][1] * 100).toFixed(2)]);
}

const updateCash = (arr) => {
  cashRegister.innerHTML = "";
  arr.forEach((money) => {
    cashRegister.innerHTML += `<p>${money[0]}: <span>$${Number(
      money[1] / 100
    ).toFixed(2)}</span></p><hr>`;
  });
};

const updateOutput = (msg) => {
  changeDue.textContent = `${msg}`;
};

const formatCounts = (obj) => {
  const objArr = Object.entries(obj);
  const filteredStr = objArr
    .filter((item) => item[1] > 0)
    .map((item) => [item[0].toUpperCase(), item[1].toFixed(2)].join(": $"))
    .join(" ");
  console.log(filteredStr);
  return filteredStr;
};

const check = (arr, msg) => {
  const status = ["Status: CLOSED", "Status: OPEN"];

  if (arr.some((value) => value[1] > 0)) {
    updateCash(arr);
    return `${status[1]} ${msg}`;
  } else {
    return `${status[0]} ${msg}`;
  }
};

const calcChange = () => {
  let priceDiff = Number(cash.value) * 100 - price * 100;
  let counts = {
    hundred: 0,
    twenty: 0,
    ten: 0,
    five: 0,
    one: 0,
    quarter: 0,
    dime: 0,
    nickle: 0,
    penny: 0,
  };
  //hundred
  while (priceDiff >= 10000 && hunCid[8][1] > 0) {
    priceDiff -= 10000;
    counts.hundred += 100;
    hunCid[8][1] -= 10000;
  }
  //twenty
  while (priceDiff >= 2000 && hunCid[7][1] > 0) {
    priceDiff -= 2000;
    counts.twenty += 20;
    hunCid[7][1] -= 2000;
  }
  //ten
  while (priceDiff >= 1000 && hunCid[6][1] > 0) {
    priceDiff -= 1000;
    counts.ten += 10;
    hunCid[6][1] -= 1000;
  }
  //five
  while (priceDiff >= 500 && hunCid[5][1] > 0) {
    priceDiff -= 500;
    counts.five += 5;
    hunCid[5][1] -= 500;
  }
  //one
  while (priceDiff >= 100 && hunCid[4][1] > 0) {
    priceDiff -= 100;
    counts.one += 1;
    hunCid[4][1] -= 100;
  }
  //quarter 25ct
  while (priceDiff >= 25 && hunCid[3][1] > 0) {
    priceDiff -= 25;
    counts.quarter += 0.25;
    hunCid[3][1] -= 25;
  }
  //dime 10ct
  while (priceDiff >= 10 && hunCid[2][1] > 0) {
    priceDiff -= 10;
    counts.dime += 0.1;
    hunCid[2][1] -= 10;
  }
  //nickel 5ct
  while (priceDiff >= 5 && hunCid[1][1] > 0) {
    priceDiff -= 5;
    counts.nickle += 0.05;
    hunCid[1][1] -= 5;
  }
  //dime 1ct
  while (priceDiff >= 1 && hunCid[0][1] > 0) {
    priceDiff -= 1;
    counts.penny += 0.01;
    hunCid[0][1] -= 1;
  }

  if (priceDiff > 0) {
    return updateOutput("Status: INSUFFICIENT_FUNDS");
  } else {
    const msg = formatCounts(counts);
    const statusMsg = check(hunCid, msg);
    return updateOutput(statusMsg);
  }
};

const returnOutput = () => {
  if (Number(cash.value) < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (Number(cash.value) === price) {
    updateOutput("No change due - customer paid with exact cash");
  } else {
    calcChange();
  }
};

purchaseBtn.addEventListener("click", returnOutput);
