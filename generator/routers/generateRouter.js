const { createDirectory, createFile } = require("../../utils");
const { existsSync } = require("fs");

const generateRouter = async (userInput) => {
  let hasFile = false
  let fileIdentifier = "";
  let FileAttribute;
  let hasFileUploadString = `upload.single("file"),`

  if (!userInput[2]) {
    console.log("no router name recieved")
    return
  } else if (!userInput[3]) {
    console.log("no model attributes recieved")
    return
  }

  // router name is also the model name.
  const routerName = userInput[2];

  let upperCaseModelName =
    routerName.charAt(0).toUpperCase() + routerName.slice(1);

  let ModelAttributes = userInput.slice(3);

  let finalAttributesForJSON = [];
  let preAttributesForPatchMethod = [];

  await ModelAttributes.map((item) => {
    let modelAttribute = item.split(":");
    let attributeName = modelAttribute[0];
    let attributeType = modelAttribute[1];

    if (attributeType == "File" || attributeType == "Image") {
      hasFile = true
      hasFileUploadString = `upload.single("${attributeName}"),`
      FileAttribute = attributeName
      return
    } else {
      if (fileIdentifier.length <= 0) {
        fileIdentifier = attributeName;
      }
      let AttributesForJSON = `${attributeName} : req.body.${attributeName}`;
      let attributesForPatchMethod = `if (req.body.${attributeName} != null) { 
      res.${routerName}.${attributeName} = req.body.${attributeName};
    }`;
      finalAttributesForJSON.push(AttributesForJSON);
      preAttributesForPatchMethod.push(attributesForPatchMethod);
    }
  });

  let finalAttributesForPatchMethod = preAttributesForPatchMethod
    .toString()
    .replace("[", "")
    .replace("]", "")
    .replace(/,/g, "");

  let hasFileContent = `
  const mongoose = require("mongoose");
  const multer = require("multer");
  const { GridFsStorage } = require("multer-gridfs-storage");
  const fileSizeLimit = 10000000;

  // database
const mongoURI = process.env.DATABASE_URL;
// connection
const conn = mongoose.createConnection(mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// init gfs
let gfs;

conn.on("error", (error) => {
  console.error(error);
});
conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "${routerName}Files",
  });
});


// create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise(async (resolve, reject) => {
      // important that you append the file last in the front end, or this might not work.
      /* depending on your images,you might want to change,
      the identifier to something more unique.
      since this will be how you search for your file */
      let fileIdentifier = await req.body.${fileIdentifier}.toString().replace(/\s+/g, '');
      const filename = \`\${fileIdentifier}_file\`
      const fileInfo = {
        filename: filename,
        bucketName: "${routerName}Files",
      };
      resolve(fileInfo);
    });
  },
  options: {
    useUnifiedTopology: true,
  },
});
const upload = multer({
  storage,
  limits: { fileSize: fileSizeLimit },
});
  `



  let router = ` const express = require("express"); 
const router = express(); \n
const ${upperCaseModelName} = require("../models/${routerName}"); \n

${hasFile ? hasFileContent : ''}

// middleware for finding ${routerName} by id
let findById = async (req, res, next) => {
  let ${routerName};
  try {
    ${routerName} = await ${upperCaseModelName}.findById(req.params.id);

    if (!${routerName}) {
      res.status(404).json({
        message_type: "warning",
        message: "could not find a ${routerName}",
    });
    return
    }
  } catch (error) {
    res.status(500).json({
            message_type: "error",
            message: "Internal server error",
            error: error
        });
  }
  res.${routerName} = ${routerName};
  next();
};

// GET all of the instances of a certain model
router.get("/", async (req, res) => { \n
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
router.get("/:id",findById, async (req, res) => { \n
 
  try{
      res.status(201).json({
          message_type: "success",
          message: "good response",
          ${routerName}: res.${routerName}
      });
  } catch (error) {
      res.status(500).json({
          message_type: "error",
          message: "Internal server error",
          error: error
      });
  } \n
}) \n


// POST a single new instance of a certain model
router.post("/",${hasFile ? hasFileUploadString : ''} async (req, res) => {
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

// PATCH a single instance of a certain model
router.patch(
  "/:id",
  findById,
  async (req, res) => {

    ${finalAttributesForPatchMethod}

    try {
      const updated_${routerName} = await res.${routerName}.save();

      if (updated_${routerName}) {
        res.status(201).json({
          message_type: "success",
          message: "good response",
          ${routerName}: updated_${routerName}
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
  }
);

router.get("/${routerName}${FileAttribute}/all${FileAttribute}s", async (req, res) => {
  await gfs.find().toArray((err, ${FileAttribute}s) => {
    if (err) {
      res.status(500).json({
        message_type: "error",
        message: "Internal server error",
        error: err
      });
    }
    // check if ${FileAttribute}s exist
    if (!${FileAttribute}s || ${FileAttribute}s.length === 0) {
      return res.status(404).json({
        message_type: "warning",
        message: "could not find any ${FileAttribute}s",
      });
    }
    // ${FileAttribute}s were found
    return res.status(201).json({
      message_type: "success",
      message: "good response",
      ${FileAttribute}: ${FileAttribute}s
    });
  });
});

router.get("/${routerName}${FileAttribute}ByFilename/:filename", (req, res) => {
  gfs.find({ filename: req.params.filename.toString().replace(/\s+/g, '') }).toArray((err, ${FileAttribute}s) => {
    if (err) {
      res.status(500).json({
        message_type: "error",
        message: "Internal server error",
        error: err
      });
    }
    // check if ${FileAttribute}s exist
    if (!${FileAttribute}s || ${FileAttribute}s.length === 0) {
      return res.status(404).json({
        message_type: "warning",
        message: "could not find a ${FileAttribute}",
      });
    }
    // ${FileAttribute}s were found
    let gotData = false;
    ${FileAttribute}s.map(async (file) => {
      let downloadStream = await gfs
        .openDownloadStreamByName(file.filename)
        .pipe(res);
      downloadStream.on("end", () => {
        test.ok(gotData);
        console.log("stream ended.");
      });
    });
  });
});

// delete a image by id
router.delete("/delete${routerName}${FileAttribute}ByFilename/:filename", async (req, res) => {
  await gfs.find().toArray((err, ${FileAttribute}s) => {
    if (err) {
      res.status(500).json({
        message_type: "error",
        message: "Internal server error",
        error: err
      });
    }
    // check if ${FileAttribute}s exist
    if (!${FileAttribute}s || ${FileAttribute}s.length === 0) {
      return res.status(404).json({
        message_type: "warning",
        message: "could not find any backgroundImages",
      });
    }
    ${FileAttribute}s.map((${FileAttribute}) => {
      if (${FileAttribute}.filename == req.params.filename) {
        gfs.delete(${FileAttribute}._id);
        res.status(201).json({
          message_type: "success",
          message: "${FileAttribute} deleted"
        });
      } else {
        res.status(404).json({
          message_type: "warning",
          message: "${FileAttribute} could not be deleted",
        });
      }
    })
  });
});

// new above

// DELETE a single instance of a certain model
router.delete("/:id", async (req, res) => {
  try {
    let deleted = await ${upperCaseModelName}.findOneAndDelete(req.params.id);
    if (deleted) {
      res.status(201).json({
        message_type: "success",
        message: "${routerName} deleted",
      });
    } else {
      res.status(404).json({
        message_type: "error",
        message: "could not find ${routerName}",
      });
    }

  } catch (error) {
    res.status(500).json({
      message_type: "error",
      message: "Internal server error",
      error: error
    });
  }
});

module.exports = router;
  `;

  if (existsSync(`routes`)) {
    createFile(`routes/${routerName}s.js`, router);
  } else {
    createDirectory("routes");
    createFile(`routes/${routerName}s.js`, router);
  }
};

module.exports = { generateRouter };
