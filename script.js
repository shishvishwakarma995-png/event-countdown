const form = document.getElementById("event-form");
const eventNameInput = document.getElementById("event-name");
const eventTimeInput = document.getElementById("event-time");
const container = document.getElementById("event-list");
const toggleBtn = document.getElementById("toggle-dark");

let events = [];

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = eventNameInput.value;
    const time = new Date(eventTimeInput.value);
    if (isNaN(time)) return alert("Invalid time");

    events.push({ name, time });
    eventNameInput.value = "";
    eventTimeInput.value = "";
    renderEvents();
});

function renderEvents() {
    container.innerHTML = "";

    events.forEach((event, index) => {
        const now = new Date().getTime();
        const distance = event.time.getTime() - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const div = document.createElement("div");
        div.className = "event";
        div.innerHTML = `
    <h3>${event.name}</h3>
    <p>${days}d ${hours}h ${minutes}m ${seconds}s</p>
    <button onclick="deleteEvent(${index})" class="delete-btn">Delete</button>
    `;

        container.appendChild(div);
    });
}

function deleteEvent(index) {
    events.splice(index, 1);
    renderEvents();
}

setInterval(renderEvents, 1000);