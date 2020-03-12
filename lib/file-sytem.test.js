const fs = require('fs').promises;
const { 
  mkdirp,
  writeJSON, 
  readJSON, 
  readDirectoryJSON, 
  updateJSON,
  deleteFile
} = require('./file-system');


jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(() => Promise.resolve()),
    writeFile: jest.fn(() => Promise.resolve()),
    readFile: jest.fn(() => Promise.resolve('{"dog":"fox"}')),
    readdir: jest.fn(() => Promise.resolve([
      'test-write.json', 'test-write2.json'])),
    unlink: jest.fn(() => Promise.resolve())
  }
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


  //test for readDirectoryJSON 
  it('reads a json directory', () => {
    return readDirectoryJSON('./data')
      .then(data => {
        expect(fs.readdir)
          .toHaveBeenCalledWith('./data');
        expect(fs.readFile)
          .toHaveBeenCalledWith('./data/test-write.json');
        expect(fs.readFile)
          .toHaveBeenCalledWith('./data/test-write2.json');
        expect(data).toEqual([
          { dog: 'fox' },
          { dog: 'fox' }
        ]);
      });
  });


  //test for updateJSON
  it('updates a json file', () => {
    return updateJSON('./test-write.json', {
      dog: 'fox' })
      .then(data => {
        expect(fs.readFile)
          .toHaveBeenCalledWith('./test-write.json');
        expect(fs.writeFile)
          .toHaveBeenCalledWith('./test-write.json', '{"dog":"fox"}');
        expect(data).toEqual({
          dog: 'fox'
        });
      });
  });

  //test for deleteFile
  it('deletes file', () => {
    return deleteFile('./test-write.json')
      .then(() => {
        expect(fs.unlink).toHaveBeenCalledWith('./test-write.json');
      });
  });
});
    
    




  

  
