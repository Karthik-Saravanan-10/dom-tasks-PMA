class Tracker {
  constructor() {
    this.headForm = document.querySelector("#head");
    this.middleForm = document.querySelector("#middle");
    this.inputDate = document.querySelector("#date");
    this.inputSummary = document.querySelector("#name");
    this.inputAmount = document.querySelector("#amount");
    this.inputTypeIncome = document.querySelector("#income-rd");
    this.inputTypeExpense = document.querySelector("#expense-rd");
    this.inputCategory = document.querySelector("#select-box");
    this.radioDiv = document.querySelector(".radio-div");
    this.trElement = document.querySelector("#trElement");
    this.secondRadio = document.querySelector("#all-rd");
    this.secondCategory = document.querySelector("#select-box2");

    this.totalAmountDiv = document.querySelector("#totalAmount");
    this.masterArray = JSON.parse(localStorage.getItem("tracker")) || [];
    this.iterateCount = 0;
  }

  showError(inputBox, detail) {
    this.nearby = inputBox.nextElementSibling;
    inputBox.classList.add("invalid-input");
    this.nearby.innerHTML = detail;
    return false;
  }

  stopError(inputBox) {
    this.nearby = inputBox.nextElementSibling;
    inputBox.classList.remove("invalid-input");
    this.nearby.innerHTML = "";
    return true;
  }

  removePreviousHistory() {
    while (this.trElement.nextElementSibling) {
      this.trElement.nextElementSibling?.remove();
    }
  }

  nameValidation(input) {
    if (!input.value) {
      return this.showError(input, "Fill the field");
    } else {
      return this.stopError(input);
    }
  }

  radioValidation() {
    if (!this.inputTypeIncome.checked && !this.inputTypeExpense.checked) {
      this.nearby = this.radioDiv.nextElementSibling;
      this.nearby.innerHTML = "Fill the field";
      return false;
    } else {
      return this.stopError(this.radioDiv);
    }
  }

  finalValidation() {
    this.isValid = false;
    this.validationArray = [
      this.nameValidation(this.inputSummary),
      this.nameValidation(this.inputDate),
      this.nameValidation(this.inputAmount),
      this.radioValidation(),
      this.nameValidation(this.inputCategory),
    ];

    for (const i of this.validationArray) {
      if (i == false) {
        this.isValid = false;
        break;
      }
      this.isValid = i;
    }

    return this.isValid;
  }

  dynamicTable(expenseArray, indexNumber) {
    this.table = document.querySelector("table");
    this.index = indexNumber;
    this.table.style.display = "table";
    expenseArray.forEach((elem) => {
      this.tr = this.table.insertRow(this.index);
      this.td0 = this.tr.insertCell(0);
      this.td1 = this.tr.insertCell(1);
      this.td2 = this.tr.insertCell(2);
      this.td3 = this.tr.insertCell(3);
      this.td4 = this.tr.insertCell(4);
      if (elem.type == "expense") {
        this.td0.innerHTML = elem.date;
        this.td1.innerHTML = elem.summary;
        this.td2.innerHTML = "";
        this.td3.innerHTML = "-" + elem.amount;
        this.td4.innerHTML = elem.balance;
      } else {
        this.td0.innerHTML = elem.date;
        this.td1.innerHTML = elem.summary;
        this.td2.innerHTML = "+" + elem.amount;
        this.td3.innerHTML = "";
        this.td4.innerHTML = elem.balance;
      }
      this.index++;
    });
  }

  incomeFilter(data) {
    this.incomeFilterArr = [];
    this.removePreviousHistory();
    this.masterArray.forEach((elem) => {
      if (elem.type == data) {
        this.incomeFilterArr.push(elem);
      }
    });
    this.dynamicTable(this.incomeFilterArr, 1);
  }

  categoryFilter(data) {
    this.secondRadio.checked = true;
    this.categoryFilterArr = [];
    this.removePreviousHistory();
    this.masterArray.forEach((elem) => {
      if (elem.category == data) {
        this.categoryFilterArr.push(elem);
      }
    });
    //console.log(categoryFilterArr);
    this.dynamicTable(this.categoryFilterArr, 1);
  }

  totalAmountDisplay(data = false) {
    this.totalAmount = 0;
    this.masterArray.forEach((elem) => {
      elem.type == "expense"
        ? (this.totalAmount = this.totalAmount - elem.amount)
        : (this.totalAmount = this.totalAmount + elem.amount);
    });
    this.totalAmount <= 0
      ? data ||
        alert(
          "Total amount is Zero.If you continue this moment it will become Negative"
        )
      : "";
    return this.totalAmount;
  }

  initLoad() {
    this.totalAmountDiv.innerHTML = this.totalAmountDisplay(true);
    if (this.masterArray.length) {
      this.removePreviousHistory();
      this.dynamicTable(this.masterArray, 1);
    } else {
      console.log("empty master");
    }
  }

  headFormInput(e) {
    e.preventDefault();
    switch (e.target.id) {
      case "name":
        this.nameValidation(this.inputSummary);
        break;
      case "date":
        this.nameValidation(this.inputDate);
        break;
      case "amount":
        this.nameValidation(this.inputAmount);
        break;
      case "income-rd":
      case "expense-rd":
        this.radioValidation();
        break;
      case "select-box":
        this.nameValidation(this.inputCategory);
        break;
      default:
        console.log("validation finished");
    }
  }

  headFormSubmit(e) {
    e.preventDefault();
    if (this.finalValidation()) {
      this.secondRadio.checked = true;
      this.initLoad();

      this.expenseArray = {
        date: this.inputDate.value,
        summary: this.inputSummary.value,
        amount: Number(this.inputAmount.value),
        category: this.inputCategory.value,
        type: this.inputTypeIncome.checked
          ? this.inputTypeIncome.value
          : this.inputTypeExpense.value,
        balance: this.inputTypeIncome.checked
          ? this.totalAmountDisplay(true) + Number(this.inputAmount.value)
          : this.totalAmountDisplay(true) - Number(this.inputAmount.value),
      };

      this.masterArray.push(this.expenseArray);
      this.dynamicTable([this.expenseArray], this.masterArray.length);
      this.totalAmountDiv.innerHTML = this.totalAmountDisplay();
      localStorage.setItem("tracker", JSON.stringify(this.masterArray));
      this.headForm.reset();
    } else {
      console.log("Fields empty");
    }
  }

  middleFormInput(e) {
    e.preventDefault();
    switch (e.target.value) {
      case "shopping":
        this.categoryFilter("shopping");
        break;
      case "loan":
        this.categoryFilter("loan");
        break;
      case "salary":
        this.categoryFilter("salary");
        break;
      case "education":
        this.categoryFilter("education");
        break;
      case "houserent":
        this.categoryFilter("houserent");
        break;
      case "miscellaneous":
        this.categoryFilter("miscellaneous");
        break;
      case "all-rd":
      case "empty":
        this.initLoad();
        break;
      default:
        console.log("others", e.target.id);
        break;
    }
  }
}

const tracker = new Tracker();

tracker.initLoad();

tracker.headForm.addEventListener("input", (e) => {
  tracker.headFormInput(e);
});
tracker.headForm.addEventListener("submit", (e) => {
  tracker.headFormSubmit(e);
});
tracker.middleForm.addEventListener("input", (e) => {
  tracker.middleFormInput(e);
});
