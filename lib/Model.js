const { v4: uuidv4 } = require('uuid');

const {
  mkdirp, 
  writeJSON, 
  readJSON, 
  readDirectoryJSON, 
  updateJSON, 
  deleteFile,
} = require('./file-system.js');

module.exports = class Model {
  constructor(modelName, schema) {
    this.modelName = modelName;
    this.schema = schema;
    mkdirp(this.modelName);
  }

  //Create
  create(obj) {
    const id = uuidv4();
    const validated = this.schema.validate(obj);
    return writeJSON(`${this.modelName}/${id}`, { ...validated, id });
  }

  //findById
  findById(id) {
    return readJSON(`${this.modelName}/${id}`);
  }

  //find 
  find() {
    return readDirectoryJSON(`${this.modelName}`);
  }

  //findByIdAndUpdate
  findByIdAndUpdate(id, updatedObjInfo) {
    return updateJSON(`${this.modelName}/${id}`, updatedObjInfo);
  }

  //findByIdAndDelete
  findByIdAndDelete(id) {
    return deleteFile(`${this.modelName}/${id}`);
  }
};

