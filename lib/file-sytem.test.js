// jest.mock('fs'), () => {
//     writeFile() {
//         return ({

//         })
//     }
// }
// describe('', () => {
    
// })
const fs = require('fs').promises;
const obj = {
  dog: 'fox'
};
const { writeJSON } = require('./file-system');


describe('test writeJSON', () => {
  afterEach(() => {
    fs.unlink('./test-writeJSON.txt');
  });

  it('writes a file', () => {
    return writeJSON('./test-writeJSON.txt', obj)
      .then(() => fs.readFile('./test-writeJSON.txt', { encoding: 'utf8' }))
      .then(newFile => {
        expect(JSON.parse(newFile)).toEqual(obj);
      });
  });
});



// These tests will be asynchronous tests. Since we’ll be writing to the file system for these tests, we’ll want to make sure we clean up our mess inside of an afterAll or afterEach. Also, do any setup inside of a beforeAll or beforeEach

// Implementation
// Use fsPromises (const fs = require('fs').promises) to write your functions. When writing JSON make sure to JSON.stringify (we can only write strings into files). When reading JSON make sure to JSON.parse.

// NOTE it’s ok if readDirectoryJSON returns an array of objects in a different order each time

// Rubric
