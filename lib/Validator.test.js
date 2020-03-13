//import Validator class
const Validator = require('../lib/Validator');

//Goals of Validator test:
// Test that validate method can take an object and return a fields value
// Test that validate method can take an object and throw an error

describe('Validator', () => {
  let validator;

  describe('required fields', () => {
    //before any of the tests get run
    beforeAll(() => {
      //set age's type to a number and make it required
      validator = new Validator('age', {
        type: Number,
        required: true
      });
    });
    //test for returning a field
    it('returns the field', () => {
      //field is an object named dog with name, age, and weight
      const dog = {
        name: 'spot',
        age: 5,
        weight: '20 lbs'
      };

      //expect the validator to test that the object(dog)'s age is complete and is a number
      expect(validator.validate(dog)).toEqual(5);
    });

    //
    it('returns the field cast to type', () => {
      const dog = {
        name: 'spot',
        age: '5',
        weight: '20 lbs'
      };

      expect(validator.validate(dog)).toEqual(5);
    });

    it('returns the field', () => {
      const dog = {
        name: 'spot',
        weight: '20 lbs'
      };

      expect(() => validator.validate(dog)).toThrowErrorMatchingSnapshot();
    });
  });

  describe('optional fields', () => {
    beforeAll(() => {
      validator = new Validator('age', {
        type: Number
      });
    });

    it('returns the field', () => {
      const dog = {
        name: 'spot',
        age: 5,
        weight: '20 lbs'
      };

      expect(validator.validate(dog)).toEqual(5);
    });

    it('returns the field cast to type', () => {
      const dog = {
        name: 'spot',
        age: '5',
        weight: '20 lbs'
      };

      expect(validator.validate(dog)).toEqual(5);
    });

    it('returns the field', () => {
      const dog = {
        name: 'spot',
        weight: '20 lbs'
      };

      expect(validator.validate(dog)).toBeNull();
    });
  });
});




// Test all permutations:
// required and field missing
// required and field there but wrong type
// required and field there and right type
// not required and field missing
// not required and field there but wrong type
// not required and field there and right type