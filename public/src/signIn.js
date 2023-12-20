let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");

let namebox = document.getElementById("nameinput");
let emailbox = document.getElementById("emailInput");
let passbox = document.getElementById("passInput");

signinBtn.onclick = function () {
  nameField.style.maxHeight = "0";
  title.innerHTML = "Sign In";
  signupBtn.classList.add("disable");
  signinBtn.classList.remove("disable");
};

signupBtn.onclick = function () {
  nameField.style.maxHeight = "60px";
  title.innerHTML = "Sign Up";
  signupBtn.classList.remove("disable");
  signinBtn.classList.add("disable");

  if (namebox.value === "") {
    console.log("did not put name");
  }
  if (emailbox.value === "") {
    console.log("no email");
  }
  if (passbox.value === "") {
    console.log("password empty");
  }
};
