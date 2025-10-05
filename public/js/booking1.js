document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let pickup = document.getElementById("pickup").value.trim();
    let drop = document.getElementById("drop").value.trim();
    let rideDate = document.getElementById("rideDate").value;
    let errorMsg = document.getElementById("errorMsg");

    errorMsg.textContent = "";

    if (pickup === "" || drop === "") {
    errorMsg.textContent = "Pickup and drop-off locations are required.";
    return;
    }

    if (pickup.toLowerCase() === drop.toLowerCase()) {
    errorMsg.textContent = "Pickup and drop-off cannot be the same.";
    return;
    }

    let selectedDate = new Date(rideDate);
    let now = new Date();
    if (selectedDate < now) {
    errorMsg.textContent = "Please select a future date and time.";
    return;
    }

    alert("Ride booked successfully from " + pickup + " to " + drop + "!");
    document.getElementById("bookingForm").reset();
});
const GEOAPIFY_API_KEY = "YOUR_GEOAPIFY_API_KEY"; // replace with your key

async function fetchSuggestions(query) {
if (!query) return [];
const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&apiKey=${GEOAPIFY_API_KEY}`;
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

    features.forEach(f => {
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
setupAutocomplete("drop", "destination-suggestions");