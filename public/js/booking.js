const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
navLinks.classList.toggle("active");
menuToggle.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll(".search-btn").forEach((btn) => {
btn.addEventListener("click", () => {
    const pickup = document.getElementById("pickup").value;
    const destination = document.getElementById("destination").value;
    const dateTime = document.getElementById("dateTime").value;
    const passengers = document.getElementById("passengers").value;
    const status = document.getElementById("bookingStatus");
    const type = btn.dataset.type;
    if (!pickup || !destination || !dateTime || !passengers) {
    status.textContent = "Please fill in all the required details.";
    status.className = "booking-status error";
    status.style.display = "block";
    return;
    }
    status.textContent = `Booking your ${type.toLowerCase()}...`;
    status.className = "booking-status";
    status.style.display = "block";
    setTimeout(() => {
    status.textContent = `Success! A ${type.toLowerCase()} will pick you up at ${pickup} and take you to ${destination}.`;
    status.className = "booking-status success";
    }, 2000);
});
});
const GEOAPIFY_API_KEY = "YOUR_GEOAPIFY_API_KEY"; // replace with your key

async function fetchSuggestions(query) {
if (!query) return [];
const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
    query
)}&apiKey=${GEOAPIFY_API_KEY}`;
const response = await fetch(url);
const data = await response.json();
return data.features || [];
}

function setupAutocomplete(inputId, suggestionsId) {
const input = document.getElementById(inputId);
const suggestionsBox = document.getElementById(suggestionsId);

input.addEventListener("input", async () => {
    const query = input.value;
    if (!query) {
    suggestionsBox.style.display = "none";
    return;
    }
    const features = await fetchSuggestions(query);

    suggestionsBox.innerHTML = "";
    if (features.length === 0) {
    suggestionsBox.style.display = "none";
    return;
    }

    features.forEach((f) => {
    const div = document.createElement("div");
    div.textContent = f.properties.formatted;
    div.className = "autocomplete-item";
    div.addEventListener("click", () => {
        input.value = f.properties.formatted;
        suggestionsBox.style.display = "none";
    });
    suggestionsBox.appendChild(div);
    });

    suggestionsBox.style.display = "block";
});

// Hide dropdown when clicking outside
document.addEventListener("click", (e) => {
    if (!suggestionsBox.contains(e.target) && e.target !== input) {
    suggestionsBox.style.display = "none";
    }
});
}

// Activate autocomplete for both inputs
setupAutocomplete("pickup", "pickup-suggestions");
setupAutocomplete("destination", "destination-suggestions");

      // Show logged-in Google user info if available
document.addEventListener("DOMContentLoaded", () => {
  const userData = localStorage.getItem("userProfile");
  if (userData) {
    const user = JSON.parse(userData);
    const authSection = document.getElementById("authSection");
    authSection.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;">
        <img src="${user.picture}" alt="Profile" style="width:35px;height:35px;border-radius:50%;">
        <span>${user.name}</span>
      </div>
    `;
  } else {
    const authSection = document.getElementById("authSection");
    authSection.innerHTML = `
      <a class="login" href="login.html">Login</a>
      <a class="signup" href="signup.html">Sign Up</a>
    `;
  }
});
