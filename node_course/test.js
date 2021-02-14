import { Command } from "commander";
import fs from "fs";
import chalk from "chalk";
import { addNote, removeNote, listNotes, readNote } from "./notes.js";
const program = new Command();

const list = (msg) => console.log(`${msg} WILL APPEAR HERE`);

program
  .option("-d, --debug", "output extra debugging")
  .option("-l, --list", "Lists notes")
  .option("-t, --title <title>", "Note title")
  .option("-b, --body <body>", "Body of added note");

const options = program.opts();
program
  .command("add")
  // .arguments("<title>")
  .action(() => addNote(options.title, options.body))
  .description("DESC ADD");
program
  .command("list")
  .action(() => {
    console.log(chalk.yellow.inverse("Your notes:"));
    listNotes();
  })
  .description("DESC LIST");

program
  .command("read")
  .arguments("<title>")
  .action(() => readNote(options.title))
  .description("DESC READ");

program
  .command("remove")
  .action(() => removeNote(options.title))
  .arguments("<title>")
  .description("DESC REMOVE");
program.parse();

// if (options.debug) console.log(options);
// console.log("pizza details:");
// if (options.small) console.log("- small pizza size");
// if (options.pizzaType) console.log(`- ${options.pizzaType}`);

// if (options.title) addNote(options.title, options.body);
