const { createDirectory, createFile } = require("../../utils");
const { existsSync } = require("fs");

const generateModel = async (userInput) => {

  if (!userInput[2]) {
    console.log("model name cant be null")
    return
  } else if (!userInput[3]) {
    console.log("model attributes cant be null")
    return
  }

  let modelName = userInput[2];

  let upperCaseFirstLetterModelName =
    modelName.charAt(0).toUpperCase() + modelName.slice(1);

  let modelItems = userInput.slice(3);

  let neWModelSchemaItems = [];

  let idField = `${modelName}_id: {
    type: String,
    required: true,
  }`;
  neWModelSchemaItems.push(idField);
  // maps through each command
  modelItems.map((unSplitEntry) => {
    let entry = unSplitEntry.split(":");
    let entryName = entry[0];
    let entryType = entry[1];
    let upperCaseentryType =
      entryType.charAt(0).toUpperCase() + entryType.slice(1);

    let modelField = {
      [entryName]: {
        type: upperCaseentryType,
        required: true,
      },
    };

    let stringField = JSON.stringify(modelField)
      .replace("{", "")
      .replace("}", "");
    neWModelSchemaItems.push(stringField);
  });

  let createdOnField = `createdOn: {
    type: Date,
    required: true,
    default: Date.now(),
  },`;
  neWModelSchemaItems.push(createdOnField);

  let finalSchemaItems = neWModelSchemaItems
    .toString()
    .replace("[", "")
    .replace("]", "")
    .replace(/"/g, "");

  let newModel = `const mongoose = require("mongoose"); \n

  const ${modelName}Schema = new mongoose.Schema({

  ${finalSchemaItems}

  }); \n

  module.exports = mongoose.model("${modelName}", ${modelName}Schema);`;
  if (!existsSync(`models`)) {
    // console.log("/models path does NOT exist");
    await createDirectory("models");
    await createFile(`models/${upperCaseFirstLetterModelName}.js`, newModel);
  } else {
    // console.log("/models path exists");
    await createFile(`models/${upperCaseFirstLetterModelName}.js`, newModel);
  }
};

module.exports = { generateModel };
