const task = document.getElementById("task");
const form = document.querySelector("form");
const addBtn = document.querySelector(".add-btn");
const dynamicDiv = document.getElementById("dynamic-div");
const checkBox = document.getElementsByClassName("checkBox");
const indicator = document.querySelectorAll(".indi-btn");
let masterArray = [];
let dataCheck;
let count = 0;

initalLoad();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  dynamicAdd();
  form.reset();
});

function dynamicAdd() {
  if (task.value) {
    count += 1;
    let data = {};
    dynamicFunction(task.value, count, (check = false));
    data["id"] = count + task.value;
    data["value"] = task.value;
    data["check"] = false;
    masterArray.push(data);
    localStorage.setItem("Todo-list", JSON.stringify(masterArray));
  } else {
    alert("Fill the Form");
  }
}

function onEdit(val) {
  task.value =
    val.parentNode.parentNode.firstElementChild.lastElementChild.innerHTML;
  masterArray = masterArray.filter((element) => {
    return element.id !== val.parentNode.firstElementChild.id;
  });
  localStorage.setItem("Todo-list", JSON.stringify(masterArray));
  val.parentNode.parentNode.remove();
}

function ondelete(val) {
  masterArray = masterArray.filter((element) => {
    //console.log(element.id, val.parentNode.firstElementChild.id);
    return element.id !== val.parentNode.firstElementChild.id;
  });
  console.log(masterArray);
  val.parentNode.parentNode.remove();
  localStorage.setItem("Todo-list", JSON.stringify(masterArray));
}

function initalLoad() {
  for (const i of indicator) {
    i.classList.remove("indicator");
  }
  indicator[0].classList.add("indicator");
  masterArray = JSON.parse(localStorage.getItem("Todo-list"));
  !masterArray
    ? ""
    : masterArray.forEach((element) => {
        dynamicFunction(element.value, element.id, element.check);
        count += 1;
      });
  //console.log(masterArray,count)
}

function dynamicFunction(value, count, check) {
  const newDiv = document.createElement("div");
  dynamicDiv.appendChild(newDiv);
  newDiv.innerHTML += `
        <div class="dynamic-content">
                    <div class="content-left">
                        <input type="checkbox" class='checkBox' onchange=checkBoxFun(this) ${
                          check ? "checked" : ""
                        }>
                        <h2>${value}</h2>
                    </div>
                    <div class="content-right">
                        <button class="edit-btn" id='${count}' type="button" onclick=onEdit(this)><img src="./asserts/icons8-edit-32.png" alt="" width="20" height="20"></button>
                        <button class="delete-btn" type="button" onclick=ondelete(this)><img src="./asserts/icons8-trash-24.png" alt=""></button>
                    </div>
                </div>
        `;
}

function checkBoxFun(val) {
  const id = val.parentNode.nextElementSibling.firstElementChild.id;
  const value = val.nextElementSibling.innerHTML;
  masterArray = masterArray.map((element) => {
    if (element.id === id) {
      element["check"] = element["check"] ? false : true;
      return element;
    }
    return element;
  });
  localStorage.setItem("Todo-list", JSON.stringify(masterArray));
}

function allFun() {
  dynamicDiv.innerHTML = "";
  count = 0;
  initalLoad();
}

function completeFun() {
  for (const i of indicator) {
    i.classList.remove("indicator");
  }
  indicator[1].classList.add("indicator");
  dynamicDiv.innerHTML = "";
  masterArray.forEach((value) => {
    if (value.check) {
      //console.log("hi")
      dynamicFunction(value.value, value.id, value.check);
    }
  });
}

function pendingFun() {
  for (const i of indicator) {
    i.classList.remove("indicator");
  }
  indicator[2].classList.add("indicator");
  dynamicDiv.innerHTML = "";
  dynamicDiv.innerHTML = "";
  masterArray.forEach((value) => {
    if (!value.check) {
      //console.log("hi")
      dynamicFunction(value.value, value.id, value.check);
    }
  });
}
