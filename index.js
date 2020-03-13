const {
  isString,
  isNumber,
  isBoolean,
  isObject,
  isArray,
  isFunction,
  getCaster,
  castToString,
  castToNumber,
  castToBoolean,
} = require('./lib/types.js');

console.log(isString('7'));
console.log(isNumber(7));
console.log(isBoolean(7));
console.log(isObject({}));
console.log(isArray([]));
console.log(isFunction(7));
console.log(getCaster(Number));
console.log(castToString(7));
console.log(castToNumber(7));
console.log(castToBoolean(7));
