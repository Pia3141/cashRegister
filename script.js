const cash = document.getElementById("cash");
const priceTag = document.getElementById("price");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const cashRegister = document.getElementById("cash-register");

let price = 3.26;
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

priceTag.textContent = price;
cid.forEach((money) => {
  cashRegister.innerHTML += `<p>${money[0]}: <span>$${money[1]}</span></p><hr>`;
});
const hunCid = [];
for (let i = 0; i < cid.length; i++) {
  hunCid.push([cid[i][0], Number(cid[i][1] * 100).toFixed(2)]);
}

console.log(hunCid);

const updateCash = (arr) => {
  cashRegister.innerHTML = "";
  arr.forEach((money) => {
    cashRegister.innerHTML += `<p>${money[0]}: <span>$${
      money[1] / 100
    }</span></p><hr>`;
  });
};

const updateOutput = (msg) => {
  changeDue.textContent = `${msg}`;
};

const formatCounts = (obj) => {
  const objArr = Object.entries(obj);
  const filteredStr = objArr
    .filter((item) => item[1] > 0)
    .map((item) => [item[0].toUpperCase(), item[1]].join(": $"))
    .join(" ");
  console.log(filteredStr);
  return filteredStr;
};

const check = (arr, msg) => {
  const status = [
    "",
    "Status: INSUFFICIENT_FUNDS",
    "Status: CLOSED",
    "Status: OPEN",
  ];
  if (arr.every((value) => value[1] > 0)) {
    return `${status[3]} ${msg}`;
  } else if (arr.every((value) => value == value[1] > 0)) {
    return `${status[2]} ${msg}`;
  } else {
    msg = "";
    return `${status[1]} ${msg}`;
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

  while (priceDiff >= 10000) {
    priceDiff -= 10000;
    counts.hundred += 100;
    hunCid[8][1] -= 10000;
  }
  while (priceDiff >= 2000) {
    priceDiff -= 2000;
    counts.twenty += 20;
    hunCid[7][1] -= 2000;
  }
  while (priceDiff >= 1000) {
    priceDiff -= 1000;
    counts.ten += 10;
    hunCid[6][1] -= 1000;
  }

  while (priceDiff >= 500) {
    priceDiff -= 500;
    counts.five += 5;
    hunCid[5][1] -= 500;
  }
  while (priceDiff >= 100) {
    priceDiff -= 100;
    counts.one += 1;
    hunCid[4][1] -= 100;
  }
  while (priceDiff >= 25) {
    priceDiff -= 25;
    counts.quarter += 0.25;
    hunCid[3][1] -= 25;
  }
  while (priceDiff >= 10) {
    priceDiff -= 10;
    counts.dive += 0.1;
    hunCid[2][1] -= 10;
  }
  while (priceDiff >= 5) {
    priceDiff -= 5;
    counts.dive += 0.05;
    hunCid[1][1] -= 5;
  }
  while (priceDiff >= 1) {
    priceDiff -= 1;
    counts.nickle += 0.01;
    hunCid[0][1] -= 1;
  }
  updateCash(hunCid);
  const msg = formatCounts(counts);
  const statusMsg = check(hunCid, msg);
  return updateOutput(statusMsg);
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
