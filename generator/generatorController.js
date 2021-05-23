const { generateModel } = require("./generateModel");
const { generateRouter } = require("./generateRouter");
const { generateEmptyServer } = require("./generateEmptyServer");
const { generateEmptyRouter } = require("./generateEmptyRouter");
const { generateRouterWithModel } = require("./generateRouterWithModel");

const generatorController = (userInput) => {
  if (userInput[1] === "model" || userInput[1] === "m") {
    generateModel(userInput);
  } else if (userInput[1] === "router" || userInput[1] === "r") {
    generateRouter(userInput);
  } else if (userInput[1] === "empty-server" || userInput[1] === "e-s") {
    generateEmptyServer(userInput);
  } else if (userInput[1] === "empty-router" || userInput[1] === "e-r") {
    generateEmptyRouter(userInput);
  } else if (userInput[1] === "router-with-model" || userInput[1] === "rwm") {
    generateRouterWithModel(userInput);
  }
};

module.exports = { generatorController, generateModel };
