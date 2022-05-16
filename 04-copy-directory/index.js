let fs = require("fs");
const path = require("path");

const newFolderPath = path.join(__dirname, "files-copy");
const oldFolderPath = path.join(__dirname, "files");
fs.access(newFolderPath, (err) => {
  if (err) {
    createFolder(newFolderPath);
  } else {
    deleteFolder(newFolderPath);
    createFolder(newFolderPath);
  }
});
function createFolder(path) {
  fs.mkdir(path, { recursive: true }, (err) => {
    if (err) throw err;
    fs.readdir(oldFolderPath, (err, files) => {
      if (err) console.log(err);
      files.forEach((file) => {
        fs.stat(`${oldFolderPath}/${file}`, (err, files) => {
          if (err) console.log(err);
          if (files.isFile()) {
            fs.copyFile(`${oldFolderPath}/${file}`, `${newFolderPath}/${file}`, fs.constants.COPYFILE_EXCL, (err) => {
              if (err) {
                console.log("Error Found:", err);
              }
            });
          }
        });
      });
    });
  });
}
function deleteFolder(folder) {
  fs.readdir(folder, (err, files) => {
    if (err) console.log(err);
    files.forEach((file) => {
      let curPath = folder + "/" + file;
      fs.unlink(curPath, (err) => {
        if (err) console.log(err);
      });
    });
  });
}
