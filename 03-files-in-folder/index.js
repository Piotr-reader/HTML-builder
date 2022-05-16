const fs = require("fs");
const path = require("path");
const testFolder = "./03-files-in-folder/secret-folder/";

fs.readdir(testFolder, (err, files) => {
  if (err) console.log(err);
  files.forEach((file) => {
    fs.stat(`${testFolder}/${file}`, (err, files) => {
      if (err) console.log(err);
      if (files.isFile()) {
        const fileName = path.parse(file).name;
        const fileExtention = path.extname(file).slice(1);
        const fileSize = (files.size / 1024).toFixed(3) + "kb";
        console.log(fileName, "-", fileExtention, "-", fileSize);
      }
    });
  });
});
