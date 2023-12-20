let submitBtn = document.getElementById("submitBtn");
let signedIn = false;

submitBtn.onclick = function () {
  //if (signedIn === false) {
  //  alert("you need to sign in first");
  //} else {
  //  alert("you ave signed in");
  //}
  getUsers();
};

const getUsers = () => {
  const users = axios.get(`http://localhost:4004/users`);
  console.log(users);
};
