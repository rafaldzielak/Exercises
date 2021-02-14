import chalk from "chalk";
import fs from "fs";

function yourNotes() {
  return "Your notes...";
}
const addNote = (title, body) => {
  debugger;
  const notes = loadNotes();
  const duplicatedNode = notes.find((note) => note.title === title);
  if (!duplicatedNode) {
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

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) console.log("BODY: " + note.body);
  else console.log(console.log(chalk.red.inverse("No such note")));
};

const listNotes = () => {
  const notes = loadNotes();
  notes.forEach((note, index) => console.log(`${index + 1}. ${note.title}`));
};

export { listNotes, addNote, loadNotes, removeNote, readNote };
