const { createDirectory, createFile } = require("./utils");
const { help } = require("./help");
const { generatorController } = require("./generator/generatorController");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("node-treker command:  \n", (commandName) => {
  let userInput = commandName.toLowerCase().trim().split(" ");
  if (userInput[0] === "generate" || userInput[0] === "g") {
    generatorController(userInput);
  } else if (userInput[0] === "help" || userInput[0] === "h") {
    help();
  }
  rl.close();
});
