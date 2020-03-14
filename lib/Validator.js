const { getCaster } = require('./types');

module.exports = class Validator {
  //Validator takes field (field was used to validate in the tests) and an object with a type and required which will tell it whether or not the field will be required (also tested)
  constructor(field, { type, required }) {
    this.field = field;
    this.type = type;
    this.required = required;
    this.caster = getCaster(type);
  }

  //the validate function will take an object (in this case dog)
  validate(obj) {
    //tells the function what field in the object to look at to validate
    const val = obj[this.field];
    //if the field is required and missing - throw an error
    if(this.required && !val) throw new Error(`${this.field} is required`);
    //if the field is not required and it's missing, return null
    if(!this.required && !val) return null;
    //return the object's field in the specified type 
    return this.caster(val);
  }
};
