const { createDirectory, createFile } = require("../utils");
const { existsSync } = require("fs");

const generateRouter = async (userInput) => {
  const routerName = userInput[2];
  let upperCaseModelName =
    routerName.charAt(0).toUpperCase() + routerName.slice(1);

  let emptyRouter = ` const express = require("express"); 
const mongoose = require("mongoose");
const router = express(); \n

const ${upperCaseModelName} = require("../models/${routerName}"); \n

router.get("/${routerName}", async (req, res) => { \n
    let ${routerName}s = await ${upperCaseModelName}.find()
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
        });
    } \n
}) \n
module.exports = router;
  `;

  if (existsSync(`routes`)) {
    // console.log("/routes path exists");
    await createFile(`routes/${routerName}s.js`, emptyRouter);
  } else {
    // console.log("/routes path does NOT exist");
    await createDirectory("routes");
    await createFile(`routes/${routerName}s.js`, emptyRouter);
  }
};

module.exports = { generateRouter };
