// js/script.js
import { fetchData } from "./utils/fetchData.js";

const url = "https://easy-simple-users-rest-api.onrender.com";

document.getElementById("loadBtn").addEventListener("click", async () => {
  const output = document.getElementById("output");
  output.textContent = "Loading...";
  try {
    const data = await fetchData(url);
    output.textContent = data;
  } catch {
    output.textContent = "Failed to load data!";
  }
});
