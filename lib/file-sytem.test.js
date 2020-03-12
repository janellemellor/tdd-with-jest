const fs = require('fs').promises;
const { writeJSON, readJSON, mkdirp } = require('./file-system');

const obj = {
  dog: 'fox'
};


//example of jest.mock test for mkdir function. Other functions can be included
jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(() => Promise.resolve()),

  }
  // readFile: jest.fn(() => {Promise.resolve()}) {

  // }, 
  // writeFile: jest.fn(() => Promise.resolve());

  // },
}));

//Test for mkdirp Function 
describe('test file system functions', () => {
  it('makes a directory and all parent directories', () => {
    return mkdirp('create/my/directories')
      .then(() => {
        expect(fs.mkdir)
          .toHaveBeenCalledWith('create/my/directories', { recursive: true }
          );
      });
  });
});


        
//     , () => {
//   .then(() => fs.stat('create/my/directories'))
//   .then(stat => {
//       expect(stat.isDirectory()).toBeTruthy();
//    });
//   });
// });
  





//Test for writeJSON function
// describe('test writeJSON', () => {
//   afterEach(() => {
//     fs.unlink('./test-writeJSON.txt');
//   });

//   it('writes a file', () => {
//     return writeJSON('./test-writeJSON.txt', obj)
//       .then(() => fs.readFile('./test-writeJSON.txt', { encoding: 'utf8' }))
//       .then(newFile => {
//         expect(JSON.parse(newFile)).toEqual(obj);
//       });
//   });
// });

// //Test for readJSON Function 
// describe('test readJSON', () => {
  
//   it('reads a file', () => {
//     return readJSON('./lib/test-file.txt')
//       .then(result => {
//         expect(result).toEqual('My dog Fox');
//       });
//   });
// });
  


//example of readDirectoryJSON
// fs.readdir('./data')
//   .then(files => {
//     return files.map(file => {
//       return fs.readFile(`./data/${file}`, { encoding: 'utf8' });
//     });
//   })
//   .then(fileContent => {
//     console.log(fileContent);
//   });
