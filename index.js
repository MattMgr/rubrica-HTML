// TOGGLE VIEW

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

// GET DATA FROM JSONS-ERVER

const tableElement = document.querySelector(".table-container");
const contactTemplate = document.getElementById("single-contact");
const postForm = document.getElementById("post-form");
const deleteIcon = contactTemplate.content.getElementById("delete-icon");
let divId;
console.log(deleteIcon);

async function sendHttpRequest(method, url, data) {
  try {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    throw new Error("Oops.. something went wrong!");
  }
}

async function fetchContacts() {
  const responseData = await sendHttpRequest(
    "GET",
    "http://localhost:3000/contacts"
  );
  const listContacts = responseData;
  viewConstructor(listContacts);
}
fetchContacts();

function viewConstructor(contacts) {
  for (const contact of contacts) {
    const id = contacts.indexOf(contact) + 1;
    const contactEl = document.importNode(contactTemplate.content, true);
    console.log(contactEl);
    contactEl
      .querySelector("a")
      .setAttribute("href", `/contacts/${id}-${contact.firstname}.html`);
    contactEl.querySelector("span").textContent = id;
    contactEl.getElementById("firstname").textContent = contact.firstname;
    contactEl.getElementById("lastname").textContent = contact.lastname;
    divId = contactEl.getElementById("contact");
    divId.classList.add(contact.id);
    // console.log(divId.getAttribute("class"));
    if (id % 2 != 0) {
      const rowDiv = contactEl.querySelector(".row");
      rowDiv.classList.add("odd");
    }
    tableElement.append(contactEl);
  }
}

postForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.target.firstname.value || !event.target.lastname.value) {
    alert("Invalid data! Please enter valid data");
    return;
  }
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
  sendHttpRequest("POST", "http://localhost:3000/contacts", contact);
});

// function deleteContact(){

// sendHttpRequest("DELETE", `http://localhost:3000/contacts/${contactId}`)

// deleteIcon.addEventListener("click", deleteContact)

tableElement.addEventListener("click", (event) => {
  if (event.target.id === "delete-icon") {
    const contactId = divId.getAttribute("class");
    console.log(contactId);
    sendHttpRequest("DELETE", `http://localhost:3000/contacts/${contactId}`);
  }
});
