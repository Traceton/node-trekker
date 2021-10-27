const { createDirectory, createFile } = require("../../utils");
const { existsSync } = require("fs");

// commands- generate tests user id:String name:String

const generateRestTest = async (userInput) => {
  if (!userInput[2] || !userInput[3]) {
    console.log("no model name or model attributes recieved")
    return
  }

  const modelName = userInput[2];

  let fileIdentifier = "";

  let ModelAttributes = userInput.slice(3);

  let finalAttributesForJSON = [];

  ModelAttributes.map((item) => {
    let modelAttribute = item.split(":");
    let attributeName = modelAttribute[0];
    let attributeType = modelAttribute[1];
    if (attributeType == "File" || attributeType == "Image") {
      return
    } else {
      if (fileIdentifier.length <= 0) {
        fileIdentifier = attributeName;
      }
      let AttributesForJSON = `\n \t${JSON.stringify(
        attributeName
      )}: "Test value" `;
      finalAttributesForJSON.push(AttributesForJSON);
    }
  });

  let restFile = `
# generated rest file from node-trekker
#model name - ${modelName}

# GET all of the instances of a certain model
GET http://localhost:3001/${modelName}s
Content-type: application/json


###



# GET a single instance of a certain model by id
GET http://localhost:3001/${modelName}s/newIdGoesHere
Content-type: application/json


###



# POST a single new instance of a certain model
POST http://localhost:3001/${modelName}s
Content-type: application/json \n
{
  ${finalAttributesForJSON}
}



###



# PATCH a single instance of a certain model
PATCH http://localhost:3001/${modelName}s/newIdGoesHere
Content-type: application/json \n
{
  ${finalAttributesForJSON}
}



###



GET http://localhost:3001/${modelName}s/${modelName}${fileIdentifier}ByFilename/:filename goes here
Content-type: application/json



###



GET http://localhost:3001/${modelName}s/${modelName}${fileIdentifier}/all${fileIdentifier}s
Content-type: application/json


###



# DELETE a single instance of a certain model
DELETE http://localhost:3001/${modelName}s/newIdGoesHere
Content-type: application/json

`;

  if (!existsSync(`tests`)) {
    // console.log("/tests path does NOT exist");
    createDirectory("tests");
    createFile(`tests/${modelName}.rest`, restFile);
  } else {
    // console.log("/tests path exists");
    createFile(`tests/${modelName}.rest`, restFile);
  }
};
module.exports = { generateRestTest };
