var loader = require('node-loader')

//This loads all .js files in the foo directory
loader.load('./foo/*.js', function (exports) {
  exports.foo();
}).done(function () {
  //The load method returns a promise
});