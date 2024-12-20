const form = document.querySelector("form");
const userName = document.querySelector("#userName");
const Email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#re-password");
const AlertP = document.querySelector(".alert");
const Emailpattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
// const Namepattern = /[a-zA-Z]$/;
const Namepattern = /^[a-zA-Z]+$/;

form.addEventListener("input", (e) => {
  e.preventDefault();
  //console.log("onInput")
  switch (e.target.id) {
    case "userName":
      nameValidation();
      break;
    case "email":
      emailValidation();
      break;
    case "password":
      passwordValidation();
      break;
    case "re-password":
      rePasswordValidation();
      break;
    default:
      console.log("validation finished");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (finalValidation()) {
    AlertP.innerHTML = "Successfully filled";
    form.reset();
  } else {
    AlertP.innerHTML = "Fill the all feilds";
  }
});

const validation = () => {};

const nameValidation = () => {
  //console.log("nameValidation");
  console.log(Namepattern.test(userName.value));
  if (!userName.value) {
    return showError(userName, "Fill the UserName");
  } else if (userName.value.length <= 2) {
    return showError(userName, "Username must be at least 3 characters");
  } else if (!Namepattern.test(userName.value)) {
    return showError(userName, "UserName is not valid ");
  } else {
    return stopError(userName);
  }
};

const emailValidation = () => {
  //console.log("emailValidation");
  if (!Email.value) {
    return showError(Email, "Fill the Email");
  } else if (!Emailpattern.test(Email.value)) {
    return showError(Email, "Email is not valid");
  } else {
    return stopError(Email);
  }
};

const passwordValidation = () => {
  //console.log("passwordValidation");
  if (!password.value) {
    return showError(password, "Fill the password");
  } else if (password.value.length < 6) {
    return showError(password, "password must be at least 6 characters");
  } else {
    return stopError(password);
  }
};

const rePasswordValidation = () => {
  //console.log("rePasswordValidation");
  if (!confirmPassword.value) {
    return showError(confirmPassword, "password2 is required");
  } else if (confirmPassword.value !== password.value) {
    return showError(
      confirmPassword,
      "confirm Password and Password did not same "
    );
  } else {
    return stopError(confirmPassword);
  }
};

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

const finalValidation = () => {
  let isValid = false;
  const validationArray = [
    nameValidation(),
    emailValidation(),
    passwordValidation(),
    rePasswordValidation(),
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
