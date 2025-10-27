import { fetchData } from "./utils/fetchData.js";
import { formFactory } from "./utils/formFactory.js";

const remoteUrl = "https://easy-simple-users-rest-api.onrender.com/api/users";
const spinner = document.querySelector(".spinner-border");
const alert = document.querySelector(".alert");
let users = [];

// Display user cards
const displayUsers = (localUsers) => {
  const usersContainer = document.getElementById("users-container");
  usersContainer.innerHTML = "";

  localUsers.forEach((user) => {
    const cardHTML = `
      <article class="card pb-3 m-2">
        <div class="card-image p-3">
          <img src="${user.avatar_url}" alt="${user.name}" height="254px"
               class="card-img-top object-fit-contain" />
          <span class="card-title">${user.name}</span>
        </div>
        <div class="card-content">
          <ul class="list-group">
            <li class="list-group-item"><strong>Name:</strong> ${user.name}</li>
            <li class="list-group-item"><strong>Age:</strong> ${user.age}</li>
            <li class="list-group-item"><strong>Gender:</strong> ${user.gender}</li>
          </ul>
          <!-- ✅ Unique edit button class -->
          <button data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  data-id="${user.id}"
                  class="edit-btn btn btn-secondary m-2">
            Edit
          </button>
        </div>
      </article>
    `;
    usersContainer.insertAdjacentHTML("beforeend", cardHTML);
  });
};

// Add event listeners only to Edit buttons (fixes bug)
const addEventListeners = () => {
  const editButtons = document.querySelectorAll(".edit-btn");

  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalBody = document.querySelector(".modal-body");
      modalBody.innerHTML = ""; // clear previous form
      modalBody.appendChild(formFactory()); // add new form
    });
  });
};

// Fetch and display data
const loadData = async () => {
  spinner.classList.remove("d-none");
  try {
    console.log("Fetching data...");
    const data = await fetchData(remoteUrl);
    spinner.classList.add("d-none");

    if (data && data.data) {
      users = data.data;
      alert.classList.remove("d-none", "alert-danger");
      alert.classList.add("alert-success");
      alert.textContent = "Data loaded successfully!";
      displayUsers(users);
      addEventListeners(); // add listeners after rendering cards
    }
  } catch (error) {
    spinner.classList.add("d-none");
    alert.classList.remove("d-none");
    alert.classList.add("alert-danger");
    alert.textContent = `Failed to load data: ${error.message}`;
  }
};

window.addEventListener("DOMContentLoaded", loadData);
