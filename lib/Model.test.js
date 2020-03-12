const Schema = require('./Schema');
const Model = require('./Model');

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


describe('Model class tests', () => { 
  //test for Create
  it('creates a new document', () => {
    return Dog
      .create({
        name: 'fox',
        age: 2, 
        weight: '65 lbs'
      })
      .then(dog => {
        expect(dog).toEqual({
          id: expect.any(String),
          name: 'fox',
          age: 2, 
          weight: '65 lbs'
        });
      });
  });

  //test for findById
  it('finds by id', () => {
    return Dog
      .create({
        name: 'fox',
        age: 2, 
        weight: '65 lbs'
      })
      .then(dog => {
        return Dog
          .findById(dog.id);
      })
      .then(foundDog => {
        expect(foundDog).toEqual({
          id: expect.any(String), 
          name: 'fox',
          age: 2, 
          weight: '65 lbs'
        });
      });
  });

});

