const fs = require('fs').promises;
const { mkdirp, writeJSON, readJSON } = require('./file-system');




jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(() => Promise.resolve()),
    writeFile: jest.fn(() => Promise.resolve()),
    readFile: jest.fn(() => Promise.resolve('{"dog":"fox"}')),

  }
  

  // }, 
  

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

  //test for writeJSON
  it('writes a file', () => {
    const obj = {
      dog: 'fox'
    };
    return writeJSON('./test-write.json', obj).then(() => {
      expect(fs.writeFile)
        .toHaveBeenCalledWith('./test-write.json', JSON.stringify(obj));

    });
  });

  //test for readJSON
  it('reads a file', () => {
    return readJSON('./test-write.json')
      .then(result => {
        expect(fs.readFile).toHaveBeenCalledWith('./test-write.json');
        expect(result).toEqual({
          dog: 'fox'
        });
      });
  });



});
    
    




  

  


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
