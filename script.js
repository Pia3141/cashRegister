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
    this.price = Number(price) * 100;
    this.cid = cid.map((item) => (item[1] *= 100));
    this.cashPaid = Number(cash.value) * 100;
    this.change = [];
  }
  getPrice() {
    return this.price;
  }
  getCash() {
    return this.cashPaid;
  }

  calcChange() {
    let priceDiff = this.cashPaid - this.price;
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
      counts[hundred]++;
      this.cid[8][1] -= 10000;
    }
    while (priceDiff >= 2000) {
      priceDiff -= 2000;
      counts[twenty]++;
      this.cid[7][1] -= 2000;
    }
    while (priceDiff >= 1000) {
      priceDiff -= 1000;
      counts[ten]++;
      this.cid[6][1] -= 1000;
    }

    while (priceDiff >= 500) {
      priceDiff -= 500;
      counts[five]++;
      this.cid[5][1] -= 500;
    }
    while (priceDiff >= 100) {
      priceDiff -= 100;
      counts[one]++;
      this.cid[4][1] -= 100;
    }
    while (priceDiff >= 25) {
      priceDiff -= 25;
      counts[quarter]++;
      this.cid[3][1] -= 25;
    }
    while (priceDiff >= 10) {
      priceDiff -= 10;
      counts[dime]++;
      this.cid[2][1] -= 10;
    }
    while (priceDiff >= 5) {
      priceDiff -= 5;
      counts[dime]++;
      this.cid[1][1] -= 5;
    }
    while (priceDiff >= 1) {
      priceDiff -= 1;
      counts[nickle]++;
      this.cid[0][1] -= 1;
    }

    return counts;
  }

  updateCash(arr) {
    cashRegister.innerHTML = "";
    arr.forEach((money) => {
      cashRegister.innerHTML += `<p class="cashValue">${money[0]}: <span>$${
        money[1] / 100
      }</span></p><hr>`;
    });
  }

  updateOutput(msg) {
    changeDue.textContent = msg;
  }
}
const store = new Register(price, cid);

priceTag.textContent = price;

cid.forEach((money) => {
  cashRegister.innerHTML += `<p class="cashValue">${money[0]}: <span>$${
    money[1] / 100
  }</span></p><hr>`;
});

const returnOutput = (obj) => {
  if (obj.getCash() < obj.getPrice()) {
    alert("Customer does not have enough money to purchase the item");
  } else if (obj.getCash() == obj.getPrice()) {
    obj.updateOutput("test");
  }
};

purchaseBtn.addEventListener("click", () => {
  returnOutput(store);
});
