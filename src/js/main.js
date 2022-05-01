// variables:
const container = document.getElementById("app");
const addNoteEl = container.querySelector(".add__note");
console.log("WORKED -----------");

getNotes().forEach((note) => {
  const noteEl = createNoteElement(note.id, note.content);
  container.insertBefore(noteEl, addNoteEl);
});

addNoteEl.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
  const textArea = document.createElement("textarea");
  textArea.setAttribute("id", "note");
  textArea.value = content;
  textArea.placeholder = "Add some thought";
  textArea.addEventListener("change", () => {
    updateNote(id, textArea.value);
  });
  textArea.addEventListener("dblclick", () => {
    console.log("dbclick");
    let isDelete = confirm("Are you sure you want to delete ?");
    console.log("Is delete", isDelete);
    if (isDelete) {
      console.log("delete");
      deleteNote(id, textArea);
    }
  });
  return textArea;
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 10000),
    content: "",
  };
  const noteEl = createNoteElement(noteObject.id, noteObject.content);
  container.insertBefore(noteEl, addNoteEl);
  notes.push(noteObject);
  saveNotes(notes);
}
function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id === id);
  console.log(targetNote);
  targetNote.content = newContent;
  saveNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id !== id);
  saveNotes(notes);
  console.log(id, element);
  container.removeChild(element);
}
