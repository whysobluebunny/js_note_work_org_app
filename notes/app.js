const noteListDiv = document.querySelector(".note-list");
let noteID = 1;
eventListeners();

// Add eventListeners
function eventListeners() {
    document.addEventListener("DOMContentLoaded", displayNotes);
    document.getElementById("add-note-btn").addEventListener("click", addNewNote);
    noteListDiv.addEventListener("click", deleteNote);
    noteListDiv.addEventListener("click", viewNote);
    document.getElementById("delete-all-btn").addEventListener("click", deleteAllNotes);
    document.getElementById("btn-save").addEventListener("click", saveChangesNote);
    document.getElementById("btn-clear").addEventListener("click", clearNoteField);
    document.getElementById("btn-download").addEventListener("click", downloadFileNotes);
    document.getElementById("btn-upload").addEventListener("click", uploadJson);
}

// add a new note in the list
function addNewNote() {
    const noteTitle = document.getElementById("note-title");
    const noteContent = document.getElementById("note-content");
    if (validateInput(noteTitle, noteContent)) {
        let notes = getDataFromStorage("notes");
        let noteItem = new Item(noteID, noteTitle.value, noteContent.value);
        noteID++;
        notes.push(noteItem);
        createNote(noteItem);

        // saving in the local storage
        localStorage.setItem("notes", JSON.stringify(notes));
        noteTitle.value = "";
        noteContent.value = "";
    }

}


//  input validation
function validateInput(title, content) {
    if (title.value !== "" && content.value !== "")
        return true;
    if (title.value === "")
        title.classList.add("warning");
    if (content.value === "")
        content.classList.add("warning");
    setTimeout(() => {
        title.classList.remove("warning");
        content.classList.remove("warning");

    }, 1600);
}

// create a new note div
function createNote(noteItem) {
    const div = document.createElement("div");
    div.classList.add("note-item");
    div.setAttribute("data-id", noteItem.id);
    div.innerHTML = `
        <h3>${noteItem.title}</h3>
        <p>${noteItem.content}</p>
        <button type = "button" class = "btn delete-note-btn">
        Delete
        </buttton>
        <button type = "button" class = "btn view-note-btn">
        View
        </buttton>
  `;
    noteListDiv.insertBefore(div, noteListDiv.firstChild);
}


// display all the notes from the local storage
function displayNotes() {
    console.log("started notes refresh")
    let notes = getDataFromStorage("notes");
    if (!notes) {
        console.log("no elements found. clearing...")
        document.getElementById("note-list").innerHTML = "";
        return;
    }
    if (notes.length > 0) {
        noteID = notes[notes.length - 1].id;
        noteID++;
    } else {
        noteID = 1;
    }
    notes.forEach(item => {
        createNote(item);
    });
}


// delete a note 
function deleteNote(e) {
    if (e.target.classList.contains("delete-note-btn")) {
        e.target.parentElement.remove();
        let divID = e.target.parentElement.dataset.id;
        let notes = getDataFromStorage("notes");
        let newNotesList = notes.filter(item => {
            return item.id !== parseInt(divID);
        });
        localStorage.setItem("notes", JSON.stringify(newNotesList));
    }
}

// view selected note
function viewNote(e) {
    if (e.target.classList.contains("view-note-btn")) {
        const viewArea = document.getElementById("view-note");
        const viewTitle = document.getElementById("view-title");
        let divID = e.target.parentElement.dataset.id;
        viewTitle.setAttribute("data-id", divID);
        let item = getDataFromStorage("notes").find(x => x.id === parseInt(divID));
        viewArea.value = item.content;
        viewTitle.innerHTML = item.title;
    }
}

// delete all notes 
function deleteAllNotes() {
    localStorage.removeItem("notes");
    let noteList = document.querySelectorAll(".note-item");
    if (noteList.length > 0) {
        noteList.forEach(item => {
            noteListDiv.removeChild(item);
        });
    }
    noteID = 1 //resetting noteID to 1
}

function clearNoteField() {
    document.getElementById("view-title").innerHTML = "View note";
    document.getElementById("view-note").value = "";
}

function saveChangesNote() {
    let divID = document.getElementById("view-title").dataset.id;
    console.log("Saving changes to id " + divID);
    // todo
}

function downloadFileNotes() {
    downloadFile("notes", "notes.json");
}

function uploadJson() {
    uploadProjectData("notes", displayNotes);
}