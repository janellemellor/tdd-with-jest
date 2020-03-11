const fs = require('fs').promises;

function writeJSON(path, obj) {
  return fs.writeFile(path, JSON.stringify(obj));
}

module.exports = {
  writeJSON,
};


//   mkdirp - make a directory and all parent directories
// writeJSON - write an object to a file
// readJSON - read an object from a file
// readDirectoryJSON - read all files in a directory as objects
// updateJSON - update a files JSON
// deleteFile - delete a file