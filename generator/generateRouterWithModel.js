const { createDirectory, createFile } = require("../utils");
const { existsSync } = require("fs");

const { generateRouter } = require("./generateRouter");
const { generateModel } = require("./generateModel");

// example command below
// use command --> g router-with-model user id:String name:String
// use command --> g router-with-model blogPost id:String name:String
// use command --> g router-with-model car id:String name:String

const generateRouterWithModel = (userInput) => {
  generateRouter(userInput);
  generateModel(userInput);
};

module.exports = { generateRouterWithModel };
