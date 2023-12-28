let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let submitSignBtn = document.getElementById("submitSignBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");

let namebox = document.getElementById("nameinput");
let emailbox = document.getElementById("emailInput");
let passbox = document.getElementById("passInput");

let upOrIn = "sign Up";

signinBtn.onclick = function () {
  nameField.style.maxHeight = "0";
  title.innerHTML = "Sign In";
  signupBtn.classList.add("disable");
  signinBtn.classList.remove("disable");

  upOrIn = "sign In";
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

  upOrIn = "sign Up";
};

submitSignBtn.onclick = function () {
  if (upOrIn === "sign Up") {
    postSubmit();
  } else {
    signingIn();
  }
};

const postSubmit = async () => {
  const signName = namebox.value;
  const signEmail = emailbox.value;
  const signPass = passbox.value;

  const signInfo = {
    signName,
    signEmail,
    signPass,
  };
  try {
    const userSignUp = await axios.post(
      `http://localhost:4004/signUp`,
      signInfo
    );
    console.log("response", userSignUp.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
  console.log(signInfo);
};

const signingIn = async () => {
  const signEmail = emailbox.value;
  const signPass = passbox.value;

  const signInInfo = {
    signEmail,
    signPass,
  };

  const userSignIn = await axios.post(
    `http://localhost:4004/signIn`,
    signInInfo
  );
  console.log(userSignIn);

  const redirectURL = userSignIn.data.redirect;
  if (redirectURL) {
    window.location.href = redirectURL;
  }
};
