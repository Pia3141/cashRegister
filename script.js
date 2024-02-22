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

class Register {
  constructor(price, cid) {
    this.price = price;
    this.cid = cid;
    this.cashPaid = Number(cash.value);
  }
  clearOutput() {
    changeDue.textContent = "";
  }

  calcChange() {
    let priceDiff = this.cashPaid - this.price;
  }

  updateCash() {
    cashRegister.innerHTML = "";
    cashRegister.innerHTML += this.cid.map((money) => {
      `<p class="cashValue" >${money[0]}: <span>${money[1]}</span></p>`;
    });
  }
}
const store = new Register(price, cid);

priceTag.textContent = price;

cid.forEach((money) => {
  cashRegister.innerHTML += `<p class="cashValue">${money[0]}: <span>${money[1]}</span></p><hr>`;
});

const returnChange = (obj) => {};
purchaseBtn.addEventListener("click", returnChange(store));
