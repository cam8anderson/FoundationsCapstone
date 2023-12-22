let submitBtn = document.getElementById("submitBtn");

let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let numberInput = document.getElementById("number");
let cityInput = document.getElementById("city");
let QuantityInput = document.getElementById("Quantity");
let waxInput = document.getElementById("wax");
let pickupInput = document.getElementById("pickup");
let dropoffInput = document.getElementById("dropoff");
let gcnInput = document.getElementById("gcn");

let signedIn = false;

submitBtn.onclick = function () {
  postForm();
};

const getUsers = () => {
  const users = axios.get(`http://localhost:4004/users`);
  console.log(users);
};

const postForm = async () => {
  const name = nameInput.value;
  const email = emailInput.value;
  const number = numberInput.value;
  const city = cityInput.value;
  const Quantity = QuantityInput.value;
  const wax = waxInput.value;
  const pickup = pickupInput.value;
  const dropoff = dropoffInput.value;
  const gcn = gcnInput.value;

  const formInfo = {
    name,
    email,
    number,
    city,
    Quantity,
    wax,
    pickup,
    dropoff,
    gcn,
  };
  console.log(formInfo);

  try {
    const personForm = await axios.post(
      `http://localhost:4004/forms`,
      formInfo
    );
    console.log("response", personForm.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};
