const tableElement = document.querySelector(".table-container");
const contactTemplate = document.getElementById("single-contact");
const postForm = document.getElementById("post-form");
const getForm = document.getElementById("get-form");
let divId;
let id;

// HTTP REQUESTS FUNCTION
async function sendHttpRequest(method, url, data) {
  try {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    throw new Error("Oops.. something went wrong!");
  }
}

// FETCH CONTACTS FUNCTION
async function fetchContacts() {
  const responseData = await sendHttpRequest(
    "GET",
    "http://localhost:4000/contacts"
  );
  const contacts = responseData;
  for (const contact of contacts) {
    id = contacts.indexOf(contact) + 1;
    viewConstructor(contact);
  }
  id = contacts.length;
}
fetchContacts();
console.log(tableElement.childNodes);

//RUBRICA'S VIEW CONTRUCTOR FUNCTION
function viewConstructor(contact) {
  const contactEl = document.importNode(contactTemplate.content, true);
  contactEl
    .querySelector("a")
    .setAttribute("href", `/contacts/${id}-${contact.firstname}.html`);
  contactEl.querySelector("span").textContent = id;
  contactEl.querySelector(".firstname").textContent = contact.firstname;
  contactEl.querySelector(".lastname").textContent = contact.lastname;
  divId = contactEl.querySelector("div");
  divId.classList.add(contact.id);
  console.log(divId.classList);
  if (id % 2 != 0) {
    const rowDiv = contactEl.querySelector(".row");
    rowDiv.classList.add("odd");
  }
  contactEl.querySelector(".delete-icon").addEventListener("click", (event) => {
    event.stopPropagation();
    console.log(event.target);
    deleteContact();
  });
  tableElement.append(contactEl);
}

//ADD CONTACT LOGIC
postForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.target.firstname.value || !event.target.lastname.value) {
    alert("Invalid data! Please enter valid data");
    return;
  }
  id++;
  const contact = {
    firstname: event.target.firstname.value.replace(
      event.target.firstname.value[0],
      event.target.firstname.value[0].toUpperCase()
    ),
    lastname: event.target.lastname.value.replace(
      event.target.lastname.value[0],
      event.target.lastname.value[0].toUpperCase()
    ),
  };
  addToDom(contact);
});

function addToDom(el) {
  sendHttpRequest("POST", "http://localhost:4000/contacts", el);
  viewConstructor(el);
}

//DELETE CONTACT FUNCTION
function deleteContact() {
  const contactId = divId.getAttribute("class");
  console.log(contactId);
  sendHttpRequest("DELETE", `http://localhost:4000/contacts/${contactId}`);
}

// FULL TEXT SEARCH
getForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.target.firstname.value) {
    alert("Invalid data! Please enter valid data");
    return;
  }
  console.log(
    sendHttpRequest(
      "GET",
      `http://localhost:4000/contacts?firstname=${firstname.value}`
    )
  );
});

//TOGGLE VIEW LOGIC
const toggleView = document.getElementById("toggle-view");
const table = document.querySelector(".table-container");
const grid = document.querySelector(".grid-container");
const tableIcon = document.querySelector(".table");
const gridIcon = document.querySelector(".grid");

toggleView.addEventListener("change", function () {
  if (grid.classList.contains("hide") && table.classList.contains("show")) {
    grid.classList.replace("hide", "show");
    table.classList.replace("show", "hide");
    sessionStorage.setItem("view", "grid");
    toggleView.checked = true;
  } else if (
    table.classList.contains("hide") &&
    grid.classList.contains("show")
  ) {
    table.classList.replace("hide", "show");
    grid.classList.replace("show", "hide");
    sessionStorage.setItem("view", "table");
    toggleView.checked = false;
  }
});

if (
  sessionStorage.getItem("view") == "table" &&
  !table.classList.contains("show") &&
  !grid.classList.contains("hide") &&
  !table.classList.contains("hide") &&
  !grid.classList.contains("show")
) {
  table.classList.add("show");
  grid.classList.add("hide");
  toggleView.checked = false;
} else if (
  sessionStorage.getItem("view") == "grid" &&
  !table.classList.contains("show") &&
  !grid.classList.contains("hide") &&
  !table.classList.contains("hide") &&
  !grid.classList.contains("show")
) {
  table.classList.add("hide");
  grid.classList.add("show");
  toggleView.checked = true;
} else if (sessionStorage.getItem("view") == "table") {
  table.classList.replace("hide", "show");
  grid.classList.replace("show", "hide");
} else if (sessionStorage.getItem("view") == "grid") {
  grid.classList.replace("hide", "show");
  table.classList.replace("show", "hide");
} else {
  table.classList.add("show");
  grid.classList.add("hide");
}
