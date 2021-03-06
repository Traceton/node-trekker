const { createDirectory, createFile } = require("../../utils");
const { existsSync } = require("fs");

const generateServer = async (userInput) => {
  // router name is also the model name.
  const routerName = userInput[2];

  let server = `
  require("dotenv").config();
    const express = require("express");
    const mongoose = require("mongoose");
    const server = express();
    const database = mongoose.connection;

    const ${routerName}sRouter = require("./routes/${routerName}s")
    
    mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    database.on("error", (error) => {
      console.log(error);
    });
    database.once("open", () => {
      console.log("connected to database");
    });
    
    server.use(express.json());
    
    server.use((req, res, next) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.set(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });

    server.use("/${routerName}s", ${routerName}sRouter);
    
    server.listen(process.env.PORT, () => {
      console.log(\`running at http://localhost:\${process.env.PORT}\`);
    });`;
  let envFile = `DATABASE_URL=
PORT=3001`;
  if (!existsSync(".env")) {
    createFile(`.env`, envFile);
  } else {
    // console.log(".env already exists and cannot be generated.");
  }
  if (!existsSync("server.js")) {
    createFile(`server.js`, server);
  } else {
    // console.log("server.js already exists and cannot be generated.");
  }
};

module.exports = { generateServer };
