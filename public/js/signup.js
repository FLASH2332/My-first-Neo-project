function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}

const form = document.getElementById("signup-form");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const email = document.getElementById("email");
const matchFeedback = document.getElementById("matchFeedback");
const emailFeedback = document.getElementById("emailFeedback");
const spinner = document.getElementById("spinner");

confirmPassword.addEventListener("input", () => {
  matchFeedback.textContent =
    confirmPassword.value !== password.value ? "Passwords do not match" : "";
});

email.addEventListener("input", () => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailFeedback.textContent = regex.test(email.value)
    ? ""
    : "Enter a valid email address";
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (password.value.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match.");
    return;
  }

  localStorage.setItem("email", email.value);
  localStorage.setItem("password", password.value);

  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none";
    alert("Account created successfully!");
    window.location.href = "index.html"; // redirect
  }, 1500);
});

/***************
     Google OAuth2 token flow -> get userinfo -> store userProfile -> redirect
     ***************/
// Replace this with your actual client id (must end with .apps.googleusercontent.com)
const GOOGLE_CLIENT_ID = "";

let googleTokenClient = null;

// Initialize token client once the library is available
function initGoogleTokenClient() {
  if (!window.google || !google.accounts || !google.accounts.oauth2) {
    console.error("Google library not available yet.");
    return;
  }

  googleTokenClient = google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID,
    scope: "openid profile email",
    // The callback receives the token response (access_token or an error)
    callback: async (tokenResponse) => {
      if (tokenResponse.error) {
        console.error("Token response error:", tokenResponse);
        alert("Google sign-in failed: " + tokenResponse.error);
        return;
      }

      console.log("Token response:", tokenResponse);

      // Use the access token to fetch user info from OpenID userinfo endpoint
      try {
        const res = await fetch(
          "https://openidconnect.googleapis.com/v1/userinfo",
          {
            headers: {
              Authorization: "Bearer " + tokenResponse.access_token,
            },
          }
        );
        if (!res.ok) {
          const text = await res.text();
          console.error("Failed to fetch userinfo:", res.status, text);
          alert("Failed to fetch Google profile info.");
          return;
        }
        const profile = await res.json();
        console.log("Google profile:", profile);

        // Save the profile in localStorage for booking.html to read
        const userProfile = {
          name: profile.name || profile.given_name || "",
          email: profile.email || "",
          picture: profile.picture || "",
        };
        localStorage.setItem("userProfile", JSON.stringify(userProfile));

        // Redirect to booking.html (or index.html) after successful sign-in
        // Use booking.html as you requested
        window.location.href = "booking.html";
      } catch (err) {
        console.error("Error fetching userinfo:", err);
        alert("Error during Google sign-in. Check console for details.");
      }
    },
  });

  // Add click listener to your custom button to request token (opens popup)
  const customBtn = document.getElementById("customGoogleBtn");
  if (customBtn) {
    customBtn.addEventListener("click", () => {
      if (!googleTokenClient) {
        console.error("googleTokenClient not initialized.");
        alert("Google sign-in not initialized yet. Try reloading the page.");
        return;
      }
      // requestAccessToken opens the popup. 'prompt' can be 'consent' to force account chooser.
      googleTokenClient.requestAccessToken({ prompt: "consent" });
    });
  }
}

// Wait until google script loads; try to initialize periodically (safe)
(function waitForGoogle() {
  if (window.google && google.accounts && google.accounts.oauth2) {
    initGoogleTokenClient();
  } else {
    // try again shortly
    setTimeout(waitForGoogle, 250);
  }
})();

// Helpful debug instructions (show in console)
console.log("Debug: signup.html loaded. Make sure to:");
console.log(
  "1) Replace GOOGLE_CLIENT_ID with your actual client id in the script."
);
console.log(
  "2) Add your page origin (e.g., http://127.0.0.1:5500) to Google Cloud Console -> OAuth 2.0 Client ID -> Authorized JavaScript origins."
);
console.log(
  "3) Use DevTools Network & Console to inspect errors if sign-in fails."
);
