const { help } = require("./help");
const { generatorController } = require("./generator/generatorController");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const recursiveReadline = () => {
  rl.question("node-trekker command: ", function (answer) {
    let userInput = answer.trim().split(" ");
    console.log(userInput[0]);
    switch (userInput[0]) {
      case "exit":
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
    recursiveReadline();
  });
};

recursiveReadline();
