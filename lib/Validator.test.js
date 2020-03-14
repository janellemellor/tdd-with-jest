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
      //set age's type to a number and make it required (this is the field we will be testing)
      validator = new Validator('age', {
        type: Number,
        required: true
      });
    });
    //test for returning a field
    it('returns the field', () => {
      //object named dog with name, age, and weight. We are specifically looking at age as the field in this case. 
      const dog = {
        name: 'spot',
        age: 5,
        weight: '20 lbs'
      };

      //expect the validator to test that the object(dog)'s age is completed
      expect(validator.validate(dog)).toEqual(5);
    });

    //check the field (age of dog) and casts to the correct type (number)
    it('returns the field cast to type', () => {
      const dog = {
        name: 'spot',
        age: '5',
        weight: '20 lbs'
      };

      //expect that the validator will change the string '5' to the number 5
      expect(validator.validate(dog)).toEqual(5);
    });

    //test that the validator can return the field 
    it('returns the field', () => {
      const dog = {
        name: 'spot',
        weight: '20 lbs'
      };

      //expect the validator to check to validate whether the field is complete
      expect(() => validator.validate(dog)).
      //since age is missing, expect it to throw an error
        toThrowErrorMatchingSnapshot();
    });
  });
  
  //test for optional fields
  describe('optional fields', () => {
    //before any of the tests get run
    beforeAll(() => {
      //set age's type to a number and DO NOT make it required (this is the field we will be testing)
      validator = new Validator('age', {
        type: Number
      });
    });

    //test that the validator can return the field (age) from the object
    it('returns the field', () => {
      const dog = {
        name: 'spot',
        age: 5,
        weight: '20 lbs'
      };

      //expect that the validator will validate that the dog has the field it's looking for (5)
      expect(validator.validate(dog)).toEqual(5);
    });

    //test to see if the validator returns the field from the object and casts it to the correct type (number)
    it('returns the field cast to type', () => {
      const dog = {
        name: 'spot',
        age: '5',
        weight: '20 lbs'
      };

      //expect the validator to return the age and cast the stringified '5' to a number 5
      expect(validator.validate(dog)).toEqual(5);
    });

    //test if the validator returns the field accurately
    it('returns the field', () => {
      const dog = {
        name: 'spot',
        weight: '20 lbs'
      };

      //expect the validator to return null since the field (age) is missing
      expect(validator.validate(dog)).toBeNull();
    });
  });
});


