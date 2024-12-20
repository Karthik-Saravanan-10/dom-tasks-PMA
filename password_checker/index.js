const inputData = document.querySelector("#password");
const form = document.querySelector("form");
const meter = document.querySelector(".meter");

form.addEventListener("input", (e) => {
  e.preventDefault();
  let index = 0;
  const regEx = [/[0-9]/, /[A-Z]/, /[a-z]/, /[^0-9A-z]/];
  const backColor = ["red", "orange", "#a3ff00", "yellow", "green"];
  const percentage = ["90px", "180px", "240px", "300px", "381px"];

  if (inputData.value.length >= 7) {
    regEx.forEach((element) => {
      if (element.test(inputData.value)) index++;
    });
  }

  meter.style.backgroundColor = backColor[index];
  meter.style.width = percentage[index];
});
