var loader = require('node-loader')

//This loads all .js files in the foo directory except for foo.js
loader.load('./foo/[!foo]*.js', function (exports) {
  exports.bar();
});