const { createDirectory, createFile } = require("../../utils");
const { existsSync } = require("fs");

const generateRouter = async (userInput) => {
  // router name is also the model name.
  const routerName = userInput[2];
  let upperCaseModelName =
    routerName.charAt(0).toUpperCase() + routerName.slice(1);

  let ModelAttributes = userInput.slice(3);

  let finalAttributesForJSON = [];

  ModelAttributes.map((item) => {
    let modelAttribute = item.split(":");

    let attributeName = modelAttribute[0];
    let attributeType = modelAttribute[1];

    let AttributesForJSON = `${attributeName} : req.body.${attributeName}`;

    finalAttributesForJSON.push(AttributesForJSON);
  });

  let router = ` const express = require("express"); 
const mongoose = require("mongoose");
const router = express(); \n

const ${upperCaseModelName} = require("../models/${routerName}"); \n


// POST a single new instance of a certain model
router.post("/${routerName}", async (req, res) => {
  const ${routerName} = await new ${upperCaseModelName}({
    ${finalAttributesForJSON}
  })

  try {
    const new_${routerName} = await ${routerName}.save();
    if(new_${routerName}) {
      res.status(201).json({
        message_type: "success",
        message: "good response",
        ${routerName}: new_${routerName}
    });
    } else {
      res.status(500).json({
        message_type: "error",
        message: "could not save to database"
      })
    }
    
  } catch (error) {
    res.status(500).json({
      message_type: "error",
      message: "Internal server error",
      error: error
    });
  }
})

// GET all of the instances of a certain model
router.get("/${routerName}s", async (req, res) => { \n
    const ${routerName}s = await ${upperCaseModelName}.find()
    try{
        if(${routerName}s) {
            res.status(201).json({
                message_type: "success",
                message: "good response",
                ${routerName}s:${routerName}s
              });
        } else {
            res.status(404).json({
                message_type: "warning",
                message: "could not find a ${routerName}",
            }); 
        }
        
    } catch (error) {
        res.status(500).json({
            message_type: "error",
            message: "Internal server error",
            error: error
        });
    } \n
}) \n

// GET a single instance of a certain model by id
router.get("/${routerName}/:id", async (req, res) => { \n
 

  const ${routerName} = await ${upperCaseModelName}.find({
    ${routerName}_id: req.params.id,
  });

  try{
      if(${routerName}) {
          res.status(201).json({
              message_type: "success",
              message: "good response",
              ${routerName}:${routerName}
            });
      } else {
          res.status(404).json({
              message_type: "warning",
              message: "could not find a ${routerName}",
          }); 
      }
      
  } catch (error) {
      res.status(500).json({
          message_type: "error",
          message: "Internal server error",
          error: error
      });
  } \n
}) \n

module.exports = router;
  `;

  if (existsSync(`routes`)) {
    // console.log("/routes path exists");
    await createFile(`routes/${routerName}s.js`, router);
  } else {
    // console.log("/routes path does NOT exist");
    await createDirectory("routes");
    await createFile(`routes/${routerName}s.js`, router);
  }
};

module.exports = { generateRouter };
