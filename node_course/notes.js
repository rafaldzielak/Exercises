import fs from "fs";

function yourNotes() {
  return "Your notes...";
}
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((note) => note.title === title);
  if (duplicateNotes.length === 0) {
    console.log(`Adding note with ttile: ${title}, and body: ${body}`);
    notes.push({ title, body });
    saveNotes(notes);
    console.log("Note Added");
  } else {
    console.log("Note with that title already exists");
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);
  console.log("Note deleted successfully");
};

const saveNotes = (notes) => {
  fs.writeFileSync("notes.json", JSON.stringify(notes));
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

export { yourNotes, addNote, loadNotes, removeNote };
