const { createDirectory, createFile } = require("../../utils");
const { existsSync } = require("fs");

const generateEmptyRouter = async (userInput) => {
  const routerName = userInput[2];

  if (!routerName) {
    console.log("router name required")
    return
  }

  let upperCaseFirstLetterRouterName =
    routerName.charAt(0).toUpperCase() + routerName.slice(1);

  let emptyRouter = ` const express = require("express"); 
const router = express(); \n

router.get("/", async (req, res) => { \n
    try{
        res.status(201).json({
            message_type: "success",
            message: "good response"

          });
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
    console.log("/routes path exists");
     createFile(`routes/${upperCaseFirstLetterRouterName}s.js`, emptyRouter);
  } else {
    console.log("/routes path does NOT exist");
     createDirectory("routes");
     createFile(`routes/${upperCaseFirstLetterRouterName}s.js`, emptyRouter);
  }
};

module.exports = { generateEmptyRouter };
