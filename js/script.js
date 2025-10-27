// js/script.js
import { fetchData } from "./utils/fetchData.js";

const remoteUrl = "https://easy-simple-users-rest-api.onrender.com/api/users";
const spinner = document.querySelector(".spinner-border");
const alert = document.querySelector(".alert");

let users = [];

// ✅ Display users
const displayUsers = (localUsers) => {
  console.log("Running displayUsers!", localUsers);
  const usersContainer = document.getElementById("users-container");
  usersContainer.innerHTML = "";

  localUsers.forEach((user) => {
    const card = `
      <div class="col mb-4">
        <div class="card position-relative shadow-sm p-3 text-start">
          <img src="${user.avatar_url}" class="card-img-top rounded" alt="${user.name}">
          <div class="card-body">
            <h5 class="card-title">${user.name}</h5>
            <p class="card-text">
              <strong>Email:</strong> ${user.email}<br>
              <strong>Age:</strong> ${user.age}<br>
              <strong>Gender:</strong> ${user.gender}<br>
              <small class="text-muted">Created: ${user.created_at}</small>
            </p>
          </div>
        </div>
      </div>
    `;
    usersContainer.insertAdjacentHTML("beforeend", card);
  });
};

// ✅ Load users from the remote API
const loadData = async () => {
  spinner.classList.remove("d-none");
  try {
    console.log("Fetching remote data...");
    const data = await fetchData(remoteUrl);

    if (data) {
      spinner.classList.add("d-none");
      users = data.data;
      displayUsers(users);

      alert.classList.remove("d-none", "alert-danger");
      alert.classList.add("alert-success");
      alert.textContent = "Data loaded successfully from the remote API!";
    }
  } catch (error) {
    spinner.classList.add("d-none");
    alert.classList.remove("d-none", "alert-success");
    alert.classList.add("alert-danger");
    alert.textContent = `Failed to load data: ${error.message}`;
  }
};

// Run when page loads
window.addEventListener("DOMContentLoaded", loadData);
