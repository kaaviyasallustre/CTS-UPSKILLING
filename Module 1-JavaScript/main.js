console.log("Welcome to the Community Portal");

window.addEventListener("load", () => {
  alert("Community Portal page is fully loaded");
});

const featuredEventName = "Community Music Night";
const featuredEventDate = "2026-07-12";
let featuredSeats = 25;
console.log(`${featuredEventName} is scheduled on ${featuredEventDate}. Seats available: ${featuredSeats}`);
featuredSeats--;

class CommunityEvent {
  constructor(id, name, date, category, location, seats, imageUrl) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.category = category;
    this.location = location;
    this.seats = seats;
    this.imageUrl = imageUrl;
  }
}

CommunityEvent.prototype.checkAvailability = function () {
  return new Date(this.date) >= new Date() && this.seats > 0;
};

let events = [];
const registrationsByCategory = {};

const eventList = document.querySelector("#eventList");
const categoryFilter = document.querySelector("#categoryFilter");
const locationFilter = document.querySelector("#locationFilter");
const searchInput = document.querySelector("#searchInput");
const selectedEvent = document.querySelector("#selectedEvent");
const emptyState = document.querySelector("#emptyState");
const spinner = document.querySelector("#loadingSpinner");
const form = document.querySelector("#registrationForm");
const formMessage = document.querySelector("#formMessage");

function addEvent(event) {
  events.push(event);
}

function createCategoryRegistrationTracker(category) {
  let totalRegistrations = 0;
  return function () {
    totalRegistrations++;
    registrationsByCategory[category] = totalRegistrations;
    return totalRegistrations;
  };
}

const categoryTrackers = {};

function getTracker(category) {
  if (!categoryTrackers[category]) {
    categoryTrackers[category] = createCategoryRegistrationTracker(category);
  }
  return categoryTrackers[category];
}

function filterEventsByCategory(category = "all", callback = event => event) {
  const clonedEvents = [...events];
  const filtered = category === "all"
    ? clonedEvents
    : clonedEvents.filter(({ category: eventCategory }) => eventCategory === category);
  return filtered.map(callback);
}

function searchEvents(eventArray, searchTerm) {
  return eventArray.filter(event => event.name.toLowerCase().includes(searchTerm.toLowerCase()));
}
function getVisibleEvents() {
  let visibleEvents = filterEventsByCategory(categoryFilter.value);

  if (locationFilter.value !== "all") {
    visibleEvents = visibleEvents.filter(event => event.location === locationFilter.value);
  }

  if (searchInput.value.trim()) {
    visibleEvents = searchEvents(visibleEvents, searchInput.value.trim());
  }

  return visibleEvents.filter(event => event.checkAvailability());
}

function formatEventCards(eventArray) {
  return eventArray.map(event => `${event.category} on ${event.name}`);
}

function renderEvents() {
  eventList.innerHTML = "";
  const visibleEvents = getVisibleEvents();
  emptyState.classList.toggle("hidden", visibleEvents.length > 0);

  visibleEvents.forEach(event => {
    const { id, name, date, category, location, seats, imageUrl } = event;
    const card = document.createElement("article");
    card.className = "event-card";
    card.innerHTML = `
      <img class="event-image" src="${imageUrl}" alt="${name}" loading="lazy">
      <div class="event-body">
        <span class="category-pill">${category}</span>
        <h3>${name}</h3>
        <p class="meta">${location}</p>
        <p class="meta">${new Date(date).toDateString()}</p>
        <p class="seats">Seats available: <span>${seats}</span></p>
        <div class="card-actions">
          <button type="button" onclick="registerUser(${id})">Register</button>
          <button type="button" class="secondary" onclick="cancelRegistration(${id})">Cancel</button>
        </div>
      </div>
    `;
    eventList.appendChild(card);
    $(card).fadeIn(250);
  });

  updateEventOptions();
  console.log("Formatted cards:", formatEventCards(visibleEvents));
}

function updateEventOptions() {
  selectedEvent.innerHTML = "";
  getVisibleEvents().forEach(({ id, name }) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = name;
    selectedEvent.appendChild(option);
  });
}

function registerUser(eventId) {
  try {
    const event = events.find(item => item.id === Number(eventId));

    if (!event) {
      throw new Error("Event not found.");
    }

    if (!event.checkAvailability()) {
      throw new Error("This event is full or no longer available.");
    }

    event.seats--;
    const categoryTotal = getTracker(event.category)();
    console.log(`Registered for ${event.name}. ${event.category} registrations: ${categoryTotal}`);
    renderEvents();
  } catch (error) {
    console.error("Registration failed:", error.message);
    alert(error.message);
  }
}

function cancelRegistration(eventId) {
  const event = events.find(item => item.id === Number(eventId));
  if (event) {
    event.seats++;
    renderEvents();
  }
}
function validateForm() {
  const name = form.elements.userName.value.trim();
  const email = form.elements.userEmail.value.trim();
  const eventId = form.elements.selectedEvent.value;
  let valid = true;

  document.querySelector("#nameError").textContent = "";
  document.querySelector("#emailError").textContent = "";
  document.querySelector("#eventError").textContent = "";

  if (name.length < 2) {
    document.querySelector("#nameError").textContent = "Enter at least 2 characters.";
    valid = false;
  }

  if (!email.includes("@") || !email.includes(".")) {
    document.querySelector("#emailError").textContent = "Enter a valid email address.";
    valid = false;
  }

  if (!eventId) {
    document.querySelector("#eventError").textContent = "Select an available event.";
    valid = false;
  }

  return { valid, name, email, eventId };
}

function postRegistration(data) {
  console.log("Submitting registration payload:", data);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(response => {
          console.log("Fetch response status:", response.status);
          if (!response.ok) {
            throw new Error("Server rejected the registration.");
          }
          return response.json();
        })
        .then(resolve)
        .catch(reject);
    }, 900);
  });
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  console.log("Registration form submitted.");

  const result = validateForm();
  if (!result.valid) {
    formMessage.textContent = "Please fix the highlighted errors.";
    formMessage.className = "message failure";
    return;
  }

  const selected = events.find(item => item.id === Number(result.eventId));
  const payload = {
    name: result.name,
    email: result.email,
    eventId: result.eventId,
    eventName: selected?.name || "Unknown event"
  };

  try {
    await postRegistration(payload);
    registerUser(result.eventId);
    formMessage.textContent = "Registration submitted successfully.";
    formMessage.className = "message success";
    form.reset();
  } catch (error) {
    console.error("Submission failed:", error);
    formMessage.textContent = "Registration failed. Check Console and Network tab.";
    formMessage.className = "message failure";
  }
});

function loadEventsWithThen() {
  return fetch("https://jsonplaceholder.typicode.com/posts?_limit=1")
    .then(response => response.json())
    .then(() => mockEvents())
    .catch(error => {
      console.error("Mock API fetch failed:", error);
      return mockEvents();
    });
}

async function loadEventsWithAsyncAwait() {
  spinner.classList.remove("hidden");
  try {
    const fetchedEvents = await loadEventsWithThen();
    fetchedEvents.forEach(addEvent);
    console.log("Object entries for first event:", Object.entries(events[0]));
    renderEvents();
  } catch (error) {
    console.error("Unable to load events:", error);
  } finally {
    spinner.classList.add("hidden");
  }
}
function mockEvents() {
  return [
    new CommunityEvent(1, "Community Music Night", "2026-07-12", "Music", "Town Hall", 25, "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=900&q=80"),
    new CommunityEvent(2, "Workshop on Baking", "2026-07-18", "Workshop", "Library", 12, "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80"),
    new CommunityEvent(3, "Neighborhood Football Match", "2026-08-02", "Sports", "Sports Ground", 20, "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=80"),
    new CommunityEvent(4, "Healthy Living Camp", "2026-08-10", "Health", "Community Park", 15, "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80"),
    new CommunityEvent(5, "Street Food Festival", "2026-09-01", "Food", "Community Park", 40, "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80"),
    new CommunityEvent(6, "Past Cleanup Drive", "2024-04-15", "Health", "Town Hall", 10, "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=900&q=80"),
    new CommunityEvent(7, "Full Guitar Class", "2026-07-22", "Music", "Library", 0, "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80")
  ];
}

categoryFilter.onchange = renderEvents;
locationFilter.onchange = renderEvents;
searchInput.addEventListener("keydown", () => setTimeout(renderEvents, 0));

document.querySelector("#showMusicBtn").onclick = () => {
  categoryFilter.value = "Music";
  renderEvents();
};

document.querySelector("#resetBtn").onclick = () => {
  categoryFilter.value = "all";
  locationFilter.value = "all";
  searchInput.value = "";
  renderEvents();
};

$("#registerBtn").click(function () {
  console.log("jQuery click handler triggered for #registerBtn");
});

loadEventsWithAsyncAwait();
