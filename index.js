const { createDirectory, createFile } = require("./utils");
const { help } = require("./help");
const { generatorController } = require("./generator/generatorController");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const recursiveReadline = () => {
  rl.question("node-trekker command: ", function (answer) {
    let userInput = answer.toLowerCase().trim().split(" ");
    console.log(userInput[0]);
    switch (userInput[0]) {
      case "exit":
        rl.close();
        break;
      case "generate":
        generatorController(userInput);
        break;
      case "g":
        generatorController(userInput);
        break;
      case "help":
        help();
        break;
      case "h":
        help();
        break;
    }
    recursiveReadline();
  });
};

recursiveReadline();
