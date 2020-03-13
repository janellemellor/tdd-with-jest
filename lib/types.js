//is functions: checks for valid inputs. Tests will check that functions return true for valid inputs and false for invalid inputs. 

//truthy if value is a string
const isString = val => typeof val === 'string';
//truthy if value is a number
const isNumber = val => typeof val === 'number';
//truthy is value is a boolean
const isBoolean = val => typeof val === 'boolean';
//truthy if value is an array
const isArray = val => Array.isArray(val);
//truthy is value is an object
const isObject = val => typeof val === 'object' && !isArray(val);
//truthy if value is a function
const isFunction = val => val instanceof Function;

//castToString takes a value
const castToString = val => {
  //if the value is a string, return the val
  if(isString(val)) return val;
  //if the value is a number, return the number as a string
  if(isNumber(val)) return val.toString();
  //if the value is boolean, return the value as a string
  if(isBoolean(val)) return val.toString();
  //if the value is an array, return the value as a string
  if(isArray(val)) return val.toString();
  //throw an error if the value cannot be turned into a string
  throw new CastError(String, val);
};

//castToNumber takes a value
const castToNumber = val => {
  //if the value is a number, return the value
  if(isNumber(val)) return val;
  const number = Number(val);
  //if the value is not a number, throw an error if the value cannot be turned into a number
  if(isNaN(number)) throw new CastError(Number, val);
  return number;
};

//castToBoolean takes a value
const castToBoolean = val => {
  //if the value is a boolean, return the value
  if(isBoolean(val)) return val;
  //if the value is equal to 1, return true
  if(val === 1) return true;
  //if the value is equal to 0, return false
  if(val === 0) return false;
  //throw an error if the value is able to be turned into a boolean
  throw new CastError(Boolean, val);
};

//castToArray takes a caster(ex.castToString) and a value
const castToArray = caster => val => {
  try {
    //maps over the value and turns it into the caster 
    return val.map(caster);
    //catches error
  } catch(e) {
    //throws an error if the value is not castable into an array
    throw new CastError(Array, val);
  }
};

//CastError is a class 
class CastError extends Error {
  constructor(Type, value) {
    //type.name refers to string, boolean, etc 
    const type = Type.name;
    //value is the input
    super(`Cannot cast >>${value}<< to ${type}`);
    this.type = type;
    this.value = value;
  }
}

//casters to be used in the castToArray function 
const casters = {
  //stringify everything in the array
  String: castToString,
  //turn eveything into numbers in the array
  Number: castToNumber,
  //turn everything to boolean in the array
  Boolean: castToBoolean
};

//getCaster takes a type (string, number, boolean...)
const getCaster = Type => {
  //if it's an array(with a type), 
  if(isArray(Type)) return castToArray(casters[Type[0].name]);
  
  return casters[Type.name] || null;
};

//export all the functions and the CastError class
module.exports = {
  isString,
  isNumber,
  isBoolean,
  isObject,
  isArray,
  isFunction,
  CastError,
  getCaster,
  castToString,
  castToNumber,
  castToBoolean,
  castToArray
};
