const inputData = document.querySelector("#password");
const form = document.querySelector("form");
const meter = document.querySelector(".meter");

form.addEventListener("input", (e) => {
  e.preventDefault();
  let index = 1;
  const regEx = [/[0-9]/, /[A-Z]/, /[a-z]/, /[^0-9A-z]/];
  const backColor = ["#A6C7A9", "red", "orange", "#a3ff00", "yellow", "green"];
  const percentage = ["0px", "90px", "180px", "240px", "300px", "381px"];
  regEx.forEach((element) => {
    if (inputData.value.length >= 7) {
      console.log("index1", index);
      if (element.test(inputData.value)) {
        index += 1;
      }
    } else if (inputData.value.length == 0) {
      console.log("index2", index);
      index = 0;
    }
  });

  meter.style.backgroundColor = backColor[index];
  meter.style.width = percentage[index];
});
