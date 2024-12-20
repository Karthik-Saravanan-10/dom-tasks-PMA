class Task {
  constructor() {
    this.masterArray = [];
    this.count = 0;
    this.form = document.querySelector("form");
    this.task = document.getElementById("task");
    this.addBtn = document.querySelector(".add-btn");
    this.dynamicDiv = document.getElementById("dynamic-div");
    this.checkBox = document.getElementsByClassName("checkBox");
    this.indicator = document.querySelectorAll(".indi-btn");
    this.indicatorPara=document.querySelector('.indicator-p');
    this.initalLoad();
  }

  initalLoad() {
    this.dynamicDiv.innerHTML = "";
    for (const i of this.indicator) {
      i.classList.remove("indicator");
    }
    this.indicator[0].classList.add("indicator");
    this.masterArray = JSON.parse(localStorage.getItem("Todo-list"));
    !this.masterArray
      ? {}
      : this.masterArray.forEach((element) => {
          this.dynamicContainer(element.value, element.id, element.check);
          this.count += 1;
        });
    //console.log(this.masterArray, this.count);
  }

  dynamicAdd() {
    if (this.task.value) {
      this.count += 1;
      this.data = {};
      this.indicatorPara.innerHTML='';
      this.task.classList.remove("indicator-div");
      this.dynamicContainer(this.task.value, this.count, (this.check = false));
      this.data["id"] = this.count + this.task.value;
      this.data["value"] = this.task.value;
      this.data["check"] = false;
      this.masterArray.push(this.data);
      localStorage.setItem("Todo-list", JSON.stringify(this.masterArray));
    } else {
      this.indicatorPara.innerHTML='Please add the event';
      this.task.classList.add("indicator-div");
    }
  }

  completeList() {
    for (const i of this.indicator) {
      i.classList.remove("indicator");
    }
    this.indicator[1].classList.add("indicator");
    this.dynamicDiv.innerHTML = "";
    this.masterArray.forEach((value) => {
      if (value.check) {
        //console.log("hi")
        this.dynamicContainer(value.value, value.id, value.check);
      }
    });
  }

  pendingList() {
    for (const i of this.indicator) {
      i.classList.remove("indicator");
    }
    this.indicator[2].classList.add("indicator");
    this.dynamicDiv.innerHTML = "";
    this.masterArray.forEach((value) => {
      if (!value.check) {
        //console.log("hi")
        this.dynamicContainer(value.value, value.id, value.check);
      }
    });
  }

  dynamicContainer(value, count, check) {
    this.newDiv = document.createElement("div");
    this.dynamicDiv.appendChild(this.newDiv);
    this.newDiv.innerHTML += `
          <div class="dynamic-content">
                      <div class="content-left">
                          <input type="checkbox" class='checkBox' onclick=toggleList(this) ${
                            check ? "checked" : ""
                          }>
                          <h3>${value}</h3>
                      </div>
                      <div class="content-right">
                          <button class="edit-btn" id='${count}' type="button" onclick=onEdit(this)><i class="fa fa-pencil" aria-hidden="true"></i></button>
                          <button class="delete-btn" type="button" onclick=ondelete(this)><i class="fa fa-trash" aria-hidden="true"></i></button>
                      </div>
                  </div>
          `;
  }
}

let todolist = new Task();

todolist.form.addEventListener("submit", (e) => {
  e.preventDefault();
  todolist.dynamicAdd();
  todolist.form.reset();
});

function toggleList(val) {
  const id = val.parentNode.nextElementSibling.firstElementChild.id;
  const value = val.nextElementSibling.innerHTML;
  todolist.masterArray = todolist.masterArray.map((element) => {
    if (element.id === id) {
      element["check"] = element["check"] ? false : true;
      return element;
    }
    return element;
  });
  localStorage.setItem("Todo-list", JSON.stringify(todolist.masterArray));
}

function onEdit(val) {
  todolist.task.value =
    val.parentNode.parentNode.firstElementChild.lastElementChild.innerHTML;
  todolist.masterArray = todolist.masterArray.filter((element) => {
    return element.id !== val.parentNode.firstElementChild.id;
  });
  localStorage.setItem("Todo-list", JSON.stringify(todolist.masterArray));
  val.parentNode.parentNode.remove();
}

function ondelete(val) {
  todolist.masterArray = todolist.masterArray.filter((element) => {
    console.log(element.id, val.parentNode.firstElementChild.id);
    return element.id !== val.parentNode.firstElementChild.id;
  });
  console.log(todolist.masterArray);
  val.parentNode.parentNode.remove();
  localStorage.setItem("Todo-list", JSON.stringify(todolist.masterArray));
}
