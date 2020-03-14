const Schema = require('../lib/Schema');

//test that validate returns the object with all fields case AND it throws an error if the object doesn't follow the schema
describe('Schema', () => {
  //test that validate returns the full object if it matches the schema
  it('validates a good schema', () => {
    //define schema shape
    const schema = new Schema({
      name: {
        type: String,
        required: true
      },
      age: {
        type: Number
      },
      weight: {
        type: String
      }
    });

    //provide a new object
    const dog = {
      name: 'spot',
      age: 5,
      weight: '20 lbs'
    };

    //expect the validate to look at dog and since it's shape matches, to return the full dog object. 
    expect(schema.validate(dog)).toEqual({
      name: 'spot',
      age: 5,
      weight: '20 lbs'
    });
  });

  //test for an object that does not match the schema 
  it('throws on a bad schema', () => {
    //define schema shape
    const schema = new Schema({
      name: {
        type: String,
        required: true
      },
      age: {
        type: Number
      },
      weight: {
        type: String
      }
    });

    //provide with an object
    const dog = {
      age: 'hi',
      weight: '20 lbs'
    };

    //expect the validate to throw an error since the object dog does not match the defined schema shape
    expect(() => schema.validate(dog)).toThrowErrorMatchingSnapshot();
  });
});
