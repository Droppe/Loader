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

});
