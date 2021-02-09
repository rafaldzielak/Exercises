import { Command } from "commander";
import fs from "fs";
import { yourNotes, addNote, removeNote } from "./notes.js";
const program = new Command();

const list = (msg) => console.log(`${msg} WILL APPEAR HERE`);

program
  .option("-d, --debug", "output extra debugging")
  .option("-s, --small", "small pizza size")
  .option("-t, --title <title>", "Note title")
  .option("-b, --body <body>", "Body of added note");

const options = program.opts();
program
  .command("add")
  // .arguments("<title>")
  .action(() => addNote(options.title, options.body))
  .description("DESC LIST");
program
  .command("read")
  .action(() => list("LIST"))
  .description("DESC READ");
program
  .command("remove")
  .action(() => removeNote(options.title))
  .arguments("<title>")
  .description("DESC READ");
program.parse();

// if (options.debug) console.log(options);
// console.log("pizza details:");
// if (options.small) console.log("- small pizza size");
// if (options.pizzaType) console.log(`- ${options.pizzaType}`);

// if (options.title) addNote(options.title, options.body);
