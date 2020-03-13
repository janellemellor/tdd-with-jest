//import is and cast to functions from types.js
const {
  isNumber,
  castToNumber,
  isString,
  castToString,
  isBoolean,
  castToBoolean,
  isObject,
  isArray,
  isFunction,
  castToArray,
  getCaster
} = require('../lib/types.js');

//tests to check that the is functions are validating correctly (true for valid inputs, false for invalid inputs)
describe('validator module', () => {
  //check that isNumber is accurately checking validity
  describe('basic validation', () => {
    it('properly tells if a value is a numbers', () => {
      //numbers should be truthy, anything else is expected to be falsey
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('hi')).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
    });

    //check that isString is accurately checking validity
    it('properly tells if a value is a string', () => {
      //strings should be truthy, all else is expected to be falsey
      expect(isString('hi')).toBeTruthy();
      expect(isString(3)).toBeFalsy();
      expect(isString([])).toBeFalsy();
      expect(isString({})).toBeFalsy();
      expect(isString(() => {})).toBeFalsy();
      expect(isString(true)).toBeFalsy();
    });

    //check that isBoolean is accuraly checking validity
    it('properly tells if a value is a boolean', () => {
      //booleans should be truthy, all else is expected to be falsey
      expect(isBoolean(true)).toBeTruthy();
      expect(isBoolean(false)).toBeTruthy();
      expect(isBoolean(3)).toBeFalsy();
      expect(isBoolean('hi')).toBeFalsy();
      expect(isBoolean([])).toBeFalsy();
      expect(isBoolean({})).toBeFalsy();
      expect(isBoolean(() => {})).toBeFalsy();
    });

    //check that isObject is accurately checking validity
    it('properly tells if a value is an object', () => {
      //objects should be truthy, all else is expected to be falsey
      expect(isObject({})).toBeTruthy();
      expect(isObject(3)).toBeFalsy();
      expect(isObject('hi')).toBeFalsy();
      expect(isObject([])).toBeFalsy();
      expect(isObject(false)).toBeFalsy();
      expect(isObject(() => {})).toBeFalsy();
    });

    //check that isArray is accurately checking validity
    it('properly tells if a value is an array', () => {
      //arrays should be truthy, all else is expected to be falsey
      expect(isArray([])).toBeTruthy();
      expect(isArray({})).toBeFalsy();
      expect(isArray(3)).toBeFalsy();
      expect(isArray('hi')).toBeFalsy();
      expect(isArray(false)).toBeFalsy();
      expect(isArray(() => {})).toBeFalsy();
    });

    //check that isFunction is accurately checking validity
    it('properly tells if a value is a function', () => {
      //functions should be truthy, all else is expected to be falsey
      expect(isFunction(() => {})).toBeTruthy();
      expect(isFunction([])).toBeFalsy();
      expect(isFunction({})).toBeFalsy();
      expect(isFunction(3)).toBeFalsy();
      expect(isFunction('hi')).toBeFalsy();
      expect(isFunction(false)).toBeFalsy();
    });
  });

  describe('casters', () => {
    it('can cast values to a number', () => {
      expect(castToNumber(3)).toEqual(3);
      expect(castToNumber('3')).toEqual(3);
      expect(castToNumber(true)).toEqual(1);
      expect(castToNumber(false)).toEqual(0);
    });

    it('throws if value is not castable to number', () => {
      expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
    });

    it('can cast values to a string', () => {
      expect(castToString('hi')).toEqual('hi');
      expect(castToString(3)).toEqual('3');
      expect(castToString(true)).toEqual('true');
      expect(castToString(false)).toEqual('false');
      expect(castToString([])).toEqual('');
    });

    it('throws if value is not castable to string', () => {
      expect(() => castToString({})).toThrowErrorMatchingSnapshot();
      expect(() => castToString(() => {})).toThrowErrorMatchingSnapshot();
    });

    it('can cast values to a boolean', () => {
      expect(castToBoolean(true)).toEqual(true);
      expect(castToBoolean(false)).toEqual(false);
      expect(castToBoolean(0)).toEqual(false);
      expect(castToBoolean(1)).toEqual(true);
    });

    it('throws if value is not castable to boolean', () => {
      expect(() => castToBoolean({})).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean(() => {})).toThrowErrorMatchingSnapshot();
    });

    it('can cast values to an array', () => {
      expect(castToArray(castToString)(['hi', 'there', 3])).toEqual(['hi', 'there', '3']);
    });

    it('throws if value is not castable to an array', () => {
      expect(() => castToArray(castToNumber)(['hi'])).toThrowErrorMatchingSnapshot();
      expect(() => castToArray(castToNumber)(3)).toThrowErrorMatchingSnapshot();
    });
  });

  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(String)).toEqual(castToString);
    expect(getCaster(Boolean)).toEqual(castToBoolean);
    expect(getCaster([String])).toBeDefined();

    expect(getCaster(Promise)).toBeNull();
  });
});
