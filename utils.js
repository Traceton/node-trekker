const fs = require("fs");

const createDirectory = (directoryPath) => {
  if (!directoryPath) {
    console.log(`no directoryPath recieved`);
    return `no directoryPath recieved`;
  }

  fs.mkdirSync(directoryPath, { recursive: true });
  return `directory created`;
};

const createFile = (filePath, fileContent) => {
  if (!filePath && !fileContent) {
    console.log(`no filePath and no fileContent recieved`);
    return `no filePath and no fileContent recieved`;
  } else if (!fileContent) {
    console.log(`no filePath OR no fileContent recieved`);
    return `no filePath OR no fileContent recieved`;
  }

  fs.writeFileSync(
    filePath,
    fileContent
  );
  return `file created`;
};

module.exports = { createDirectory, createFile };
