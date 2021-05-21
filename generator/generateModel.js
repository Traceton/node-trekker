const { createDirectory, createFile } = require("../utils");

const generateModel = async (userInput) => {
  // removes commands from start
  userInput.shift();
  userInput.shift();
  let modelName = userInput[0];
  userInput.shift();

  let neWModelSchemaItems = [];

  // maps through each command
  userInput.map((unSplitEntry) => {
    let entry = unSplitEntry.split(":");
    let entryName = entry[0];
    let entryType = entry[1];

    let modelField = {
      [entryName]: {
        type: entryType,
        required: true,
      },
    };
    neWModelSchemaItems.push(modelField);

    let newModel = `const mongoose = require("mongoose"); \n

    const ${modelName}Schema = new mongoose.Schema({
    ${JSON.stringify(neWModelSchemaItems)}
    }); \n

    module.exports = mongoose.model("${modelName}", ${modelName}Schema);`;

    createFile(`${modelName}.js`, newModel);

    // trying to get a mongoose model to print using the user entries
    // console.log(JSON.stringify(modelField));
  });
};

module.exports = { generateModel };
