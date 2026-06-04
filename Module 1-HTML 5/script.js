const form = document.getElementById("registrationForm");
const eventType = document.getElementById("eventType");
const formStatus = document.getElementById("formStatus");
const clearPreference = document.getElementById("clearPreference");
const locationButton = document.getElementById("locationButton");
const locationStatus = document.getElementById("locationStatus");

const savedEvent = localStorage.getItem("preferredEvent");

if (savedEvent) {
  eventType.value = savedEvent;
}

eventType.addEventListener("change", () => {
  if (eventType.value) {
    localStorage.setItem("preferredEvent", eventType.value);
  }
});

clearPreference.addEventListener("click", () => {
  localStorage.removeItem("preferredEvent");
  eventType.value = "";
  formStatus.textContent = "Saved preference cleared.";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const selectedEvent = eventType.value;

  if (!name || !selectedEvent) {
    formStatus.textContent = "Please enter your name and select an event.";
    return;
  }

  localStorage.setItem("preferredEvent", selectedEvent);
  formStatus.textContent = `Thank you, ${name}. You registered for ${selectedEvent}.`;
  form.reset();
  eventType.value = selectedEvent;
});

locationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    locationStatus.textContent = "Geolocation is not supported by this browser.";
    return;
  }

  locationStatus.textContent = "Finding your location...";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude.toFixed(4);
      const longitude = position.coords.longitude.toFixed(4);
      locationStatus.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
    },
    () => {
      locationStatus.textContent = "Unable to fetch location. Please allow location access.";
    }
  );
});
