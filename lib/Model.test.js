const Schema = require('./Schema');
const Model = require('./Model');

describe('Model class tests', () => {
  it('creates a new document', () => {
    const schema = new Schema({
      name: {
        type: String,
        required: true
      },
      age: {
        type: Number,
        required: true
      },
      weight: {
        type: String
      }
    });

    const Dog = new Model('Dog', schema);

    return Dog
      .create({
        name: 'fox',
        age: 2, 
        weight: '65 lbs'
      })
      .then(dog => {
        expect(dog).toEqual({
          _id: expect.any(String),
          name: 'fox',
          age: 2, 
          weight: '65 lbs'
        });
      });
  });



});

