// js/script.js
import { fetchData } from "./utils/fetchData.js";

const remoteUrl = "https://easy-simple-users-rest-api.onrender.com";
const localUrl = "../mock-data/response.json";

// DOM elements
const alert = document.querySelector(".alert");
const spinner = document.querySelector(".spinner-border");

const loadData = async () => {
  spinner.classList.remove("d-none");
  try {
    console.log("Fetching data...");
    const result = await fetchData(localUrl);
    const users = result.data;

    spinner.classList.add("d-none");
    alert.classList.remove("d-none", "alert-danger");
    alert.classList.add("alert-success");
    alert.innerHTML = "<strong>Data loaded successfully!</strong>";

    // ✅ Container for cards
    const container = document.createElement("div");
    container.id = "users-container";
    container.classList.add("d-flex", "flex-wrap", "justify-content-center");

    // ✅ Create proper card HTML
    users.forEach((user) => {
      const card = `
        <div class="card position-relative shadow-sm m-3 p-3 text-start">
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
      `;
      container.insertAdjacentHTML("beforeend", card);
    });

    alert.insertAdjacentElement("afterend", container);
  } catch (error) {
    spinner.classList.add("d-none");
    alert.classList.remove("d-none", "alert-success");
    alert.classList.add("alert-danger");
    alert.textContent = "Failed to load data!";
    console.error("Failed to load data:", error.message);
  }
};

// Trigger load
window.addEventListener("DOMContentLoaded", loadData);
