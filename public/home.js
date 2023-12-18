let submitBtn = document.getElementById("submitBtn");
let signedIn = false;

submitBtn.onclick = function () {
  if (signedIn === false) {
    alert("you need to sign in first");
  } else {
    alert("you ave signed in");
  }
};
