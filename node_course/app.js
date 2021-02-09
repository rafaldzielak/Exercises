import fs from "fs";
import chalk from "chalk";
import validator from "validator";
import yargs from "yargs";
import { yourNotes } from "./notes.js";

console.log(yargs.argv);

const command = process.argv[2];
if (command === "add") {
  console.log("ADD");
} else if (command === "remove") {
  console.log("REMOVE");
}
