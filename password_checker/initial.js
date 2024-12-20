const inputData = document.querySelector("#password");
const form = document.querySelector("form");
const meter = document.querySelector(".meter");
const specialCharacter = /^[A-Za-z0-9 ]+$/;

form.addEventListener("input", (e) => {
  let data = e.target.value.split("");
  console.log(calculation(data));
  //console.log(data);
  if (calculation(data) == 0) {
    meter.setAttribute("style", "width: 0px");
  } else if (calculation(data) <= 50) {
    meter.setAttribute("style", "background-color: red;width: 100px");
    console.log("danger");
  } else if (50 < calculation(data) && calculation(data) <= 70) {
    console.log("good");
    meter.setAttribute("style", "background-color: orange;width: 200px");
  } else if (70 < calculation(data) && calculation(data) <= 80) {
    console.log("strong");
    meter.setAttribute("style", "background-color: yellow;width: 280px");
  } else {
    console.log("too strong");
    meter.setAttribute("style", "background-color: green;width: 381px");
  }
});

const calculation = (data) => {
  let numberCount = 0;
  let lowercaseCount = 0;
  let uppercaseCount = 0;
  let specialCount = 0;
  let total = 0;

  data.forEach((elem) => {
    //console.log(elem)
    if (data.length < 8) {
      total = 50;
    } else {
      total = 50;
      if (!isNaN(Number(elem))) {
        numberCount = 10;
      } else if (!specialCharacter.test(elem)) {
        specialCount = 15;
      } else if (elem === elem.toUpperCase()) {
        uppercaseCount = 5;
      } else if (elem == elem.toLowerCase()) {
        lowercaseCount = 5;
      }
    }
  });
  //console.log(lowercaseCount, uppercaseCount, numberCount, specialCount, total);
  return lowercaseCount + uppercaseCount + numberCount + specialCount + total;
};

// const propertyColor = (data) => {
//   switch (data) {
//     case "0":
      
//       break;
//     case "50":
      
//       break;
//     case "60":
      
//       break;
//     case "70":
      
//       break;
//     case "80":
      
//       break;
//   }
// };
