const peopleDirectory = [
  { id: "erika", name: "Erika Fuller", title: "Director, People Analytics", color: "#0f6cbd" },
  { id: "miguel", name: "Miguel Garcia", title: "HR Business Partner", color: "#8764b8" },
  { id: "bruno", name: "Bruno Zhao", title: "Engineering Manager", color: "#13a10e" },
  { id: "sarah", name: "Sarah Perez", title: "Operations Lead", color: "#c4314b" },
  { id: "aadi", name: "Aadi Kapoor", title: "Research Manager", color: "#ca5010" },
  { id: "serena", name: "Serena Davis", title: "Finance Partner", color: "#038387" },
];

const state = {
  panelOpen: false,
  tab: "access",
  orgExpanded: true,
  granted: [],
  selectedPerson: null,
};

const els = {
  panel: document.getElementById("dataPanel"),
  overlay: document.getElementById("overlay"),
  toast: document.getElementById("toast"),
  peopleList: document.getElementById("peopleList"),
  orgCardBody: document.getElementById("orgCardBody"),
  orgChevron: document.getElementById("orgChevron"),
  personSearch: document.getElementById("personSearch"),
  personSuggestions: document.getElementById("personSuggestions"),
  selectedPerson: document.getElementById("selectedPerson"),
  accessMessage: document.getElementById("accessMessage"),
  grantAccessBtn: document.getElementById("grantAccessBtn"),
  panelAccess: document.getElementById("panel-access"),
  panelAttributes: document.getElementById("panel-attributes"),
};

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.hidden = false;
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    els.toast.hidden = true;
  }, 2600);
}

function openPanel(tab = "access") {
  state.panelOpen = true;
  els.panel.hidden = false;
  setTab(tab);
}

function closePanel() {
  state.panelOpen = false;
  els.panel.hidden = true;
}

function setTab(tab) {
  state.tab = tab;
  document.querySelectorAll(".tab").forEach((button) => {
    const active = button.dataset.tab === tab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  els.panelAccess.hidden = tab !== "access";
  els.panelAttributes.hidden = tab !== "attributes";
}

function toggleOrgCard() {
  state.orgExpanded = !state.orgExpanded;
  els.orgCardBody.hidden = !state.orgExpanded;
  els.orgChevron.classList.toggle("open", state.orgExpanded);
  document.getElementById("toggleOrgCard").setAttribute("aria-expanded", String(state.orgExpanded));
}

function renderPeople() {
  if (!state.granted.length) {
    els.peopleList.hidden = true;
    els.peopleList.innerHTML = "";
    return;
  }

  els.peopleList.hidden = false;
  els.peopleList.innerHTML = state.granted
    .map(
      (person) => `
      <li>
        <div class="person-meta">
          <div class="avatar" style="background:${person.color}">${initials(person.name)}</div>
          <div>
            <strong>${person.name}</strong>
            <div style="color:var(--fg-2);font-size:12px">${person.title}</div>
          </div>
        </div>
        <button class="icon-btn" type="button" data-remove="${person.id}" aria-label="Remove ${person.name}">···</button>
      </li>`
    )
    .join("");
}

function openModal() {
  state.selectedPerson = null;
  els.personSearch.value = "";
  els.accessMessage.value = "";
  els.personSuggestions.hidden = true;
  els.selectedPerson.hidden = true;
  els.grantAccessBtn.disabled = true;
  els.overlay.hidden = false;
  els.personSearch.focus();
}

function closeModal() {
  els.overlay.hidden = true;
}

function renderSuggestions(query) {
  const q = query.trim().toLowerCase();
  const matches = peopleDirectory.filter(
    (person) =>
      !state.granted.some((g) => g.id === person.id) &&
      (!q || person.name.toLowerCase().includes(q) || person.title.toLowerCase().includes(q))
  );

  if (!matches.length) {
    els.personSuggestions.hidden = true;
    els.personSuggestions.innerHTML = "";
    return;
  }

  els.personSuggestions.hidden = false;
  els.personSuggestions.innerHTML = matches
    .map(
      (person) => `
      <li>
        <button type="button" data-select="${person.id}">
          <span class="avatar" style="background:${person.color}">${initials(person.name)}</span>
          <span>
            <strong>${person.name}</strong>
            <div style="color:var(--fg-2);font-size:12px">${person.title}</div>
          </span>
        </button>
      </li>`
    )
    .join("");
}

function selectPerson(id) {
  const person = peopleDirectory.find((p) => p.id === id);
  if (!person) return;
  state.selectedPerson = person;
  els.selectedPerson.hidden = false;
  els.selectedPerson.innerHTML = `
    <span class="avatar" style="background:${person.color}">${initials(person.name)}</span>
    ${person.name}
  `;
  els.personSuggestions.hidden = true;
  els.personSearch.value = person.name;
  els.grantAccessBtn.disabled = false;
}

function grantAccess() {
  if (!state.selectedPerson) return;
  if (!state.granted.some((p) => p.id === state.selectedPerson.id)) {
    state.granted = [...state.granted, state.selectedPerson];
  }
  renderPeople();
  closeModal();
  if (!state.panelOpen) openPanel();
  setTab("access");
  if (!state.orgExpanded) toggleOrgCard();
  showToast(`Access granted to ${state.selectedPerson.name}`);
}

document.querySelectorAll("[data-open-panel]").forEach((button) => {
  button.addEventListener("click", () => {
    openPanel(button.dataset.tabTarget || "access");
  });
});

document.querySelectorAll(".suggestion-row button:not(.more-chip)").forEach((button) => {
  button.addEventListener("click", () => {
    const askInput = document.getElementById("askInput");
    if (!askInput) return;
    askInput.value = button.textContent.trim();
    askInput.focus();
  });
});

document.getElementById("closePanel").addEventListener("click", closePanel);
document.getElementById("giveAccessBtn").addEventListener("click", openModal);
document.getElementById("closeModal").addEventListener("click", closeModal);
document.getElementById("grantAccessBtn").addEventListener("click", grantAccess);
document.getElementById("toggleOrgCard").addEventListener("click", toggleOrgCard);

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => setTab(tab.dataset.tab));
});

els.personSearch.addEventListener("input", (event) => {
  state.selectedPerson = null;
  els.selectedPerson.hidden = true;
  els.grantAccessBtn.disabled = true;
  renderSuggestions(event.target.value);
});

els.personSearch.addEventListener("focus", () => {
  renderSuggestions(els.personSearch.value);
});

els.personSuggestions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-select]");
  if (!button) return;
  selectPerson(button.dataset.select);
});

els.peopleList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;
  const id = button.dataset.remove;
  state.granted = state.granted.filter((person) => person.id !== id);
  renderPeople();
  showToast("Access updated");
});

els.overlay.addEventListener("click", (event) => {
  if (event.target === els.overlay) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!els.overlay.hidden) closeModal();
    else if (state.panelOpen) closePanel();
  }
});

closePanel();
renderPeople();
