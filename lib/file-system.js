const fs = require('fs').promises;

function mkdirp(path) {
  return fs.mkdir(path, { recursive: true });
}


function writeJSON(path, obj) {
  return fs.writeFile(path, JSON.stringify(obj))
    .then(() => obj);
}

function readJSON(path) {
  return fs.readFile(path, { encoding: 'utf8' })
    .then(newFile => 
      JSON.parse(newFile));
}
    

module.exports = {
  writeJSON,
  readJSON,
  mkdirp,
};


//   mkdirp - make a directory and all parent directories

//mkdir -p will make a directory and all parent directories

// writeJSON - write an object to a file
// readJSON - read an object from a file
// readDirectoryJSON - read all files in a directory as objects
// updateJSON - update a files JSON
// deleteFile - delete a file