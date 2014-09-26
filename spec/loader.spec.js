var loader = require('../lib/loader');

describe('loader', function() {
  var env;

  beforeEach(function () {
    env = new jasmine.Env();
  });

  it('should load a file', function (done) {
    var load = 0;

    loader.load('./spec/dir_to_load/foo.js', function (exports) {
      if (exports('Hello World!') === 'Hello World!') {
        load += 1;
      }
    }).then(function () {
      expect(load).toEqual(1);
      done();
    });
  });

  it('should load a files matching a pattern', function (done) {
    var load = 0;

    loader.load('./spec/dir_to_load/*.js', function (exports) {
      if (exports('Hello World!') === 'Hello World!') {
        load += 1;
      }
    }).then(function () {
      expect(load).toEqual(3);
      done();
    });
  });

  it('should load a dir matching a pattern ', function (done) {
    var load = 0;

    loader.load('./spec/dir_to_load/**/*.js', function (exports) {
      if (exports('Hello World!') === 'Hello World!') {
        load += 1;
      }
    }).then(function () {
      expect(load).toEqual(6);
      done();
    });
  });

  it('should load files matching a complex pattern', function (done) {
    var load = 0;

    loader.load('./spec/dir_to_load/**/[!foo]*.js', {}, function (exports) {
      if (exports('Hello World!') === 'Hello World!') {
        load += 1;
      }
    }).then(function () {
      expect(load).toEqual(4);
      done();
    });
  });

  it('optional the callback should be optional', function (done) {
    loader.load('./spec/dir_to_load/**/*.js').then(function () {
      expect(1).toEqual(1);
      done();
    });
  });

  it('should load multiple files matching multiple patterns', function (done) {
    var load = 0;

    loader.load(['./spec/dir_to_load/foo.js', './spec/dir_to_load/bar.js'], function (exports) {
      if (exports('Hello World!') === 'Hello World!') {
        load += 1;
      }
    }).then(function () {
      expect(load).toEqual(2);
      done();
    });
  });

  it('should pass the file name to the callback', function (done) {
    moduleName = './spec/dir_to_load/foo.js';
    loader.load(moduleName, function(exports, filename){
      expect(filename).toEqual(moduleName);
    }).then(function(){
      done();
    });
  });

});
