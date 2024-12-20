let inputData = document.querySelector("#input-box");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputData.value ? validation(inputData.value) : alert("Enter Numbers");
});

const validation = (data) => {
  let answer = eval(data).toString();
  console.log(answer);
  let output = isFinite(answer) ? answer : "Cannot Divided By Zero";
  inputData.value = output;
};

const pressBtn = (num) => {
  inputData.value += num;
};

const clearBtn = () => {
  inputData.value = "";
};

console.log("loaded");
