const { createDirectory, createFile } = require("../../utils");
const { existsSync } = require("fs");

// commands- generate tests user id:String name:String

const generateRestTest = async (userInput) => {
  const modelName = userInput[2];

  let restFile = `
    # generated rest file from node-treker
    #model name - ${modelName}

    GET http://localhost:3001/${modelName}

    `;

  if (!existsSync(`tests`)) {
    // console.log("/tests path does NOT exist");
    await createDirectory("tests");
    await createFile(`tests/${modelName}.rest`, restFile);
  } else {
    // console.log("/tests path exists");
    await createFile(`tests/${modelName}.rest`, restFile);
  }
};
module.exports = { generateRestTest };
