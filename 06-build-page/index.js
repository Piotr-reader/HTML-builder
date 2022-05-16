let fs = require("fs");
const path = require("path");
const createProjectDistFolder = path.join(__dirname, "project-dist");

// create project-dist folder
fs.mkdir(createProjectDistFolder, { recursive: true }, (err) => {
  if (err) throw err;
});
// copy styles

const pathProjectDist = path.join(__dirname, "project-dist");
const pathStyles = path.join(__dirname, "styles");
fs.access(`${pathProjectDist}/style.css`, (err) => {
  if (err) {
    addStylys(pathProjectDist, pathStyles);
  } else {
    removeOldBundle(pathProjectDist);
    addStylys(pathProjectDist, pathStyles);
  }
});
function removeOldBundle(pathProjectDist) {
  fs.unlink(`${pathProjectDist}/style.css`, (err) => {
    if (err) console.log(err);
  });
}
function addStylys(pathProjectDist, pathStyles) {
  fs.readdir(pathStyles, (err, files) => {
    if (err) console.log(err);
    files.forEach((file) => {
      fs.stat(`${pathStyles}/${file}`, (err, files) => {
        const fileExtention = path.extname(file).slice(1);
        if (err) console.log(err);
        if (files.isFile() && fileExtention === "css") {
          fs.readFile(`${pathStyles}/${file}`, (err, content) => {
            fs.appendFile(`${pathProjectDist}/style.css`, `${content.toString()}`, (err) => {
              if (err) throw err;
            });
            if (err) throw err;
          });
        }
      });
    });
  });
}
// copy assets
const newAssets = path.join(createProjectDistFolder, "assets");
const oldAssets = path.join(__dirname, "assets");
fs.access(newAssets, (err) => {
  if (err) {
    createFolder(newAssets);
  } else {
    deleteFolder(newAssets);
    createFolder(newAssets);
  }
});
function createFolder(path) {
  fs.mkdir(path, { recursive: true }, (err) => {
    if (err) throw err;
  });
  fs.readdir(oldAssets, (err, folders) => {
    if (err) console.log(err);
    folders.forEach((file) => {
      fs.readdir(`${oldAssets}/${file}`, (err, files) => {
        fs.mkdir(`${newAssets}/${file}`, { recursive: true }, (err) => {
          if (err) throw err;
        });
        files.forEach((copyFile) => {
          fs.copyFile(`${oldAssets}/${file}/${copyFile}`, `${newAssets}/${file}/${copyFile}`, fs.constants.COPYFILE_EXCL, (err) => {
            if (err) {
              console.log("Error Found:", err);
            }
          });
        });
      });
    });
  });
}
function deleteFolder(folder) {
  fs.readdir(folder, (err, files) => {
    if (err) console.log(err);
    files.forEach((folderInside) => {
      fs.readdir(`${folder}/${folderInside}`, (err, files) => {
        let curPath = `${folder}/${folderInside}`;
        files.forEach((f) => {
          fs.unlink(`${folder}/${folderInside}/${f}`, (err) => {
            if (err) console.log(err);
          });
        });
        if (err) console.log(err);
      });
    });
  });
}
// create index.html
let stream = new fs.ReadStream(path.join(__dirname, "template.html"), "utf-8");
const componentsPath = path.join(__dirname, "components");
stream.on("readable", function () {
  let tester = ``;
  let data = stream.read();
  if (data !== null) {
    let dataString = data.split(",").toString();
    fs.readdir(componentsPath, (err, files) => {
      if (err) console.log(err);
      files.forEach((file) => {
        fs.stat(`${componentsPath}/${file}`, (err, files) => {
          if (err) console.log(err);
          if (files.isFile()) {
            fs.readFile(`${componentsPath}/${file}`, "utf8", function (err, data) {
              if (err) console.log(err);
              const fileName = path.parse(file).name;
              tester = `{{${fileName}}}`;
              dataString = dataString.replace(tester, data);
              fs.writeFile(path.join(createProjectDistFolder, "index.html"), dataString, (err) => {
                if (err) throw err;
              });
            });
          }
        });
      });
    });
  }
});
stream.on("end", function () {});
