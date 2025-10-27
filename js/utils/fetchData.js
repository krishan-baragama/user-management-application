// js/utils/fetchData.js
export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // parse JSON, not text
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
};
