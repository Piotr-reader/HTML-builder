let fs = require("fs");
const path = require("path");

const pathProjectDist = path.join(__dirname, "project-dist");
const pathStyles = path.join(__dirname, "styles");
fs.access(`${pathProjectDist}/bundle.css`, (err) => {
  if (err) {
    addStylys(pathProjectDist, pathStyles);
  } else {
    removeOldBundle(pathProjectDist);
    addStylys(pathProjectDist, pathStyles);
  }
});

function removeOldBundle(pathProjectDist) {
  fs.unlink(`${pathProjectDist}/bundle.css`, (err) => {
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
            fs.appendFile(`${pathProjectDist}/bundle.css`, `${content.toString()}`, (err) => {
              if (err) throw err;
            });
            if (err) throw err;
          });
        }
      });
    });
  });
}
