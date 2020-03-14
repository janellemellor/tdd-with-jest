const Validator = require('./Validator');

module.exports = class Schema {
  //create/initalize schema constructor
  constructor(schema) {
    this.schema = schema;
    //validators = the schema object's keys and values (define the schema)
    this.validators = Object.entries(schema)
      // field -> 'age', options => { type: Number }
      //store the object array in this.validators
      .map(([field, options]) => new Validator(field, options));
    // [new Validator('name', { type: String, required: true }), new Validator('age', { type: Number })];
  }

  // { name: 12345, age: 5 }
  //invoke the validate function which takes an obj
  validate(obj) {
    //will put validated into an object
    const validated = {};
    //will put errors into an array
    const errors = [];
    //for each validator, invoke validate
    this.validators
      .forEach(validator => {
        // new Validator('age', { type: Number })
        try {
          // validated -> { name: '12345', age: 5 }
          //put each validated validator in to the validated object
          validated[validator.field] = validator.validate(obj);
        } catch(e) {
          //push any errors into the errors array
          errors.push(e);
        }
      });
    
    //if the errors array is greater than 0, throw an Error with the message below
    if(errors.length > 0) {
      throw new Error(`invalid schema >> ${errors}`);
    }

    return validated;
  }

};
