// =====================
// DATA LAYER
// =====================
const services = [
  { name: "National Emergency Number", type: "All", number: "999", icon: "assets/emergency.png" },
  { name: "Police Helpline Number", type: "Police", number: "999", icon: "assets/police.png" },
  { name: "Fire Service Number", type: "Fire", number: "999", icon: "assets/fire-service.png" },
  { name: "Ambulance Service", type: "Health", number: "1994-999999", icon: "assets/ambulance.png" },
  { name: "Women & Child Helpline", type: "Help", number: "109", icon: "assets/emergency.png" },
  { name: "Anti-Corruption Helpline", type: "Govt", number: "106", icon: "assets/emergency.png" },
  { name: "Electricity Helpline", type: "Electricity", number: "16216", icon: "assets/emergency.png" },
  { name: "Brac Helpline", type: "NGO", number: "16445", icon: "assets/brac.png" },
  { name: "Bangladesh Railway", type: "Travel", number: "163", icon: "assets/Bangladesh-Railway.png" }
];

// =====================
// STATE
// =====================
const state = {
  coins: 100,
  hearts: 0,
  copies: 0,
  history: []
};

// =====================
// ELEMENTS
// =====================
const serviceContainer = document.getElementById("service-container");
const coinDisplay = document.getElementById("coin-display");
const heartDisplay = document.getElementById("display-heart");
const copyDisplay = document.getElementById("btn-copy-display");
const historyContainer = document.getElementById("call-history");

// =====================
// RENDER SERVICES
// =====================
function renderServices() {
  serviceContainer.innerHTML = services.map(service => `
    <div class="card bg-white shadow rounded-xl p-4 service-card">
      <div class="flex justify-between items-center">
        <div class="p-2 bg-gray-100 rounded-lg">
          <img src="${service.icon}" class="w-6 h-6" />
        </div>

        <button class="heart text-gray-400">
          <i class="fa-regular fa-heart"></i>
        </button>
      </div>

      <h3 class="font-bold text-lg mt-2 service-name">${service.name}</h3>
      <p class="text-2xl font-bold service-number">${service.number}</p>
      <span class="text-xs bg-gray-200 px-2 py-1 rounded">${service.type}</span>

      <div class="flex gap-2 mt-3">
        <button class="btn-copy border px-3 py-1 rounded w-full">
          <i class="fa-solid fa-copy"></i> Copy
        </button>

        <button class="btn-call bg-green-600 text-white px-3 py-1 rounded w-full">
          <i class="fa-solid fa-phone"></i> Call
        </button>
      </div>
    </div>
  `).join("");
}

// =====================
// UI UPDATE
// =====================
function updateUI() {
  coinDisplay.textContent = state.coins;
  heartDisplay.textContent = state.hearts;
  copyDisplay.textContent = state.copies;
}

// =====================
// HISTORY RENDER
// =====================
function renderHistory() {
  historyContainer.innerHTML = state.history.map(item => `
    <div class="bg-gray-100 p-2 rounded-lg text-sm">
      <div class="font-bold">${item.name}</div>
      <div>${item.number}</div>
      <div class="text-gray-500 text-xs">${item.time}</div>
    </div>
  `).join("");
}

// =====================
// EVENT DELEGATION
// =====================
serviceContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".service-card");
  if (!card) return;

  const name = card.querySelector(".service-name").textContent;
  const number = card.querySelector(".service-number").textContent;

  // CALL
  if (e.target.closest(".btn-call")) {
    if (state.coins < 20) {
      alert("Not enough coins (need 20)");
      return;
    }

    state.coins -= 20;
    updateUI();

    alert(`Calling ${name} - ${number}`);

    const time = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Dhaka"
    });

    state.history.unshift({ name, number, time });
    renderHistory();
  }

  // COPY
  if (e.target.closest(".btn-copy")) {
    navigator.clipboard.writeText(number)
      .then(() => {
        state.copies++;
        updateUI();
        alert(`Copied: ${number}`);
      })
      .catch(() => alert("Copy failed"));
  }

  // HEART
  if (e.target.closest(".heart")) {
    state.hearts++;
    updateUI();
  }
});

// =====================
// CLEAR HISTORY
// =====================
document.getElementById("btn-clr").addEventListener("click", () => {
  state.history = [];
  renderHistory();
});

// =====================
// INIT APP
// =====================
renderServices();
updateUI();