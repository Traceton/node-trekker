const { createDirectory, createFile } = require("./utils");
const { generatorController } = require("./generator/generatorController");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("node-treker command:  \n", (commandName) => {
  let userInput = commandName.trim().split(" ");
  if (userInput[0] === "generate" || userInput[0] === "g") {
    generatorController(userInput);
  }
  rl.close();
});
