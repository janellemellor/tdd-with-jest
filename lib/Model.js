const { v4: uuidv4 } = require('uuid');

const {
  mkdirp, 
  writeJSON, 
  readJSON, 
  readDirectoryJSON
} = require('./file-system');

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
};

//Example code
// const dogSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   age: {
//     type: Number
//   },
//   weight: {
//     type: String
//   }
// });
  
// const Dog = new Model('Dog', dogSchema);
  
// Dog
//   .create({ name: 'spot', age: 5, weight: '20 lbs' })
//   .then(createdDog => {
//     // do stuff with a created dog
//   });
  
// Dog
//   .find()
//   .then(allDogs => {
//     // do stuff with all dogs
//   });
  
// Dog
//   .findById(dogId)
//   .then(dog => {
//     // do stuff with a dog
//   });
  
// Dog
//   .findByIdAndUpdate(dogId, { name: 'rover' })
//   .then(updatedDog => {
//     // do stuff with the updated dog
//   });
  
// Dog
//   .findByIdAndDelete(dogI)
//   .then(deletedDog => {
//     // do stuff with the deleted dog
//   });



//lab instructions
// Use your File System Functions to interact with the File System. Whenever a new Model is created make a directory to save files to. Whenever a new item is created create a random id using uuid.


// const randomId = uuid();
