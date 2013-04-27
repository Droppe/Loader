var loader = require('node-loader')

loader.load('./foo.js', function (exports) {
  exports.foo();
});