const headForm = document.querySelector("#head");
const middleForm = document.querySelector("#middle");
const inputDate = document.querySelector("#date");
const inputSummary = document.querySelector("#name");
const inputAmount = document.querySelector("#amount");
const inputTypeIncome = document.querySelector("#income-rd");
const inputTypeExpense = document.querySelector("#expense-rd");
const inputCategory = document.querySelector("#select-box");
const radioDiv = document.querySelector(".radio-div");
const trElement = document.querySelector("#trElement");
const secondRadio = document.querySelector("#all-rd");
const secondCategory = document.querySelector("#select-box2");

const totalAmountDiv = document.querySelector("#totalAmount");
let masterArray = JSON.parse(localStorage.getItem("tracker")) || [];
let iterateCount = 0;

const showError = (inputBox, detail) => {
  let nearby = inputBox.nextElementSibling;
  inputBox.classList.add("invalid-input");
  nearby.innerHTML = detail;
  return false;
};

const stopError = (inputBox) => {
  let nearby = inputBox.nextElementSibling;
  inputBox.classList.remove("invalid-input");
  nearby.innerHTML = "";
  return true;
};

const removePreviousHistory = () => {
  while (trElement.nextElementSibling) {
    trElement.nextElementSibling?.remove();
  }
};

const nameValidation = (input) => {
  if (!input.value) {
    return showError(input, "Fill the field");
  } else {
    return stopError(input);
  }
};

const radioValidation = () => {
  if (!inputTypeIncome.checked && !inputTypeExpense.checked) {
    let nearby = radioDiv.nextElementSibling;
    nearby.innerHTML = "Fill the field";
    return false;
  } else {
    return stopError(radioDiv);
  }
};

const finalValidation = () => {
  let isValid = false;
  const validationArray = [
    nameValidation(inputSummary),
    nameValidation(inputDate),
    nameValidation(inputAmount),
    radioValidation(),
    nameValidation(inputCategory),
  ];

  for (const i of validationArray) {
    if (i == false) {
      isValid = false;
      break;
    }
    isValid = i;
  }

  return isValid;
};

const dynamicTable = (expenseArray, indexNumber) => {
  const table = document.querySelector("table");
  let index = indexNumber;
  table.style.display = "table";
  expenseArray.forEach((elem) => {
    const tr = table.insertRow(index);
    const td0 = tr.insertCell(0);
    const td1 = tr.insertCell(1);
    const td2 = tr.insertCell(2);
    const td3 = tr.insertCell(3);
    const td4 = tr.insertCell(4);
    if (elem.type == "expense") {
      td0.innerHTML = elem.date;
      td1.innerHTML = elem.summary;
      td2.innerHTML = "";
      td3.innerHTML = "-" + elem.amount;
      td4.innerHTML = elem.balance;
    } else {
      td0.innerHTML = elem.date;
      td1.innerHTML = elem.summary;
      td2.innerHTML = "+" + elem.amount;
      td3.innerHTML = "";
      td4.innerHTML = elem.balance;
    }
    index++;
  });
};

function initLoad() {
  totalAmountDiv.innerHTML = totalAmountDisplay(true);
  if (masterArray.length) {
    removePreviousHistory();
    dynamicTable(masterArray, 1);
  } else {
    console.log("empty master");
  }
}

const incomeFilter = (data) => {
  const incomeFilterArr = [];
  removePreviousHistory();
  masterArray.forEach((elem) => {
    if (elem.type == data) {
      incomeFilterArr.push(elem);
    }
  });
  dynamicTable(incomeFilterArr, 1);
};

const totalAmountDisplay = (data = false) => {
  let totalAmount = 0;
  masterArray.forEach((elem) => {
    elem.type == "expense"
      ? (totalAmount = totalAmount - elem.amount)
      : (totalAmount = totalAmount + elem.amount);
  });
  totalAmount <= 0
    ? data ||
      alert(
        "Total amount is Zero.If you continue this moment it will become Negative"
      )
    : "";
  return totalAmount;
};

const categoryFilter = (data) => {
  secondRadio.checked = true;
  const categoryFilterArr = [];
  removePreviousHistory();
  masterArray.forEach((elem) => {
    if (elem.category == data) {
      categoryFilterArr.push(elem);
    }
  });
  //console.log(categoryFilterArr);
  dynamicTable(categoryFilterArr, 1);
};

headForm.addEventListener("input", (e) => {
  e.preventDefault();
  switch (e.target.id) {
    case "name":
      nameValidation(inputSummary);
      break;
    case "date":
      nameValidation(inputDate);
      break;
    case "amount":
      nameValidation(inputAmount);
      break;
    case "income-rd":
    case "expense-rd":
      radioValidation();
      break;
    case "select-box":
      nameValidation(inputCategory);
      break;
    default:
      console.log("validation finished");
  }
});

headForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (finalValidation()) {
    secondRadio.checked = true;
    initLoad();

    let expenseArray = {
      date: inputDate.value,
      summary: inputSummary.value,
      amount: Number(inputAmount.value),
      category: inputCategory.value,
      type: inputTypeIncome.checked
        ? inputTypeIncome.value
        : inputTypeExpense.value,
      balance: inputTypeIncome.checked
        ? totalAmountDisplay(true) + Number(inputAmount.value)
        : totalAmountDisplay(true) - Number(inputAmount.value),
    };

    masterArray.push(expenseArray);
    dynamicTable([expenseArray], masterArray.length);
    totalAmountDiv.innerHTML = totalAmountDisplay();
    localStorage.setItem("tracker", JSON.stringify(masterArray));
    headForm.reset();
  } else {
    console.log("Fields empty");
  }
});

middleForm.addEventListener("input", (e) => {
  e.preventDefault();
  //console.log(e.target.value);
  switch (e.target.value) {
    case "shopping":
      categoryFilter("shopping");
      break;
    case "loan":
      categoryFilter("loan");
      break;
    case "salary":
      categoryFilter("salary");
      break;
    case "education":
      categoryFilter("education");
      break;
    case "houserent":
      categoryFilter("houserent");
      break;
    case "miscellaneous":
      categoryFilter("miscellaneous");
      break;
    case "all-rd":
    case "empty":
      initLoad();
      break;
    default:
      console.log("others", e.target.id);
      break;
  }
});
