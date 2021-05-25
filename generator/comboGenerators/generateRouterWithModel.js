const { createDirectory, createFile } = require("../../utils");
const { existsSync } = require("fs");

const { generateRouter } = require("../routers/generateRouter");
const { generateModel } = require("../models/generateModel");
const { generateRestTest } = require("../tests/generateRestTest");

// example command below
// use command --> g router-with-model blogPost name:String firstName:String lastName:String
// use command --> g router-with-model blogPost id:String name:String
// use command --> g router-with-model car id:String name:String

const generateRouterWithModel = (userInput) => {
  generateRouter(userInput);
  generateModel(userInput);
  generateRestTest(userInput);
};

module.exports = { generateRouterWithModel };
