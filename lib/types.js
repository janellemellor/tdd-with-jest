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

const castToString = val => {
  if(isString(val)) return val;
  if(isNumber(val)) return val.toString();
  if(isBoolean(val)) return val.toString();
  if(isArray(val)) return val.toString();
  throw new CastError(String, val);
};

const castToNumber = val => {
  if(isNumber(val)) return val;
  const number = Number(val);
  if(isNaN(number)) throw new CastError(Number, val);
  return number;
};

const castToBoolean = val => {
  if(isBoolean(val)) return val;
  if(val === 1) return true;
  if(val === 0) return false;
  throw new CastError(Boolean, val);
};

const castToArray = caster => val => {
  try {
    return val.map(caster);
  } catch(e) {
    throw new CastError(Array, val);
  }
};

class CastError extends Error {
  constructor(Type, value) {
    const type = Type.name;
    super(`Cannot cast >>${value}<< to ${type}`);
    this.type = type;
    this.value = value;
  }
}

const casters = {
  String: castToString,
  Number: castToNumber,
  Boolean: castToBoolean
};

const getCaster = Type => {
  if(isArray(Type)) return castToArray(casters[Type[0].name]);
  
  return casters[Type.name] || null;
};

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
