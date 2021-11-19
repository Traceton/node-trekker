const { help } = require("./help");
const { generatorController } = require("./generator/generatorController");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const recursiveReadline = () => {
  let didExit = false
  rl.question("node-trekker command: ", function (answer) {
    let userInput = answer.trim().split(" ");
    switch (userInput[0]) {
      case "exit":
        didExit = true
        rl.close();
        break;
      case "generate":
      case "g":
        generatorController(userInput);
        break;
      case "help":
      case "h":
        help();
        break;
    }
    if (didExit == false) {
      recursiveReadline();
    }
  });
};

recursiveReadline();
