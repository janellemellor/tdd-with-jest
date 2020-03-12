const fs = require('fs').promises;

function mkdirp(path) {
  return fs.mkdir(path, { recursive: true });
}

function writeJSON(path, obj) {
  return fs.writeFile(path, JSON.stringify(obj))
    .then(() => obj);
}

function readJSON(path) {
  return fs.readFile(path)
    .then(newFile => 
      JSON.parse(newFile));    
}

function readDirectoryJSON(path) {
  return fs.readdir(path)
    .then(files => {
      return Promise.all(files.map(file => 
        readJSON(`${path}/${file}`)));
    });
}

function updateJSON(path, obj) {
  return readJSON(path)
    .then(json => {
      const updatedJSON = { ...json, ...obj };
      return writeJSON(path, updatedJSON);
    });
}


    

module.exports = {
  writeJSON,
  readJSON,
  mkdirp,
  readDirectoryJSON, 
  updateJSON
};




// updateJSON - update a files JSON
// deleteFile - delete a file