/**
 * Loader
 * @license https://github.com/Droppe/Loader/blob/master/README.md MIT
 * @copyright Copyright 2013 Droppe
 * @author Robert Martone
 */

/**
 * Module dependencies.
 */

var fs = require('fs'),
  path = require('path'),
  glob = require('multi-glob').glob,
  promise = require('promised-io/promise');

/**
 * Loads files based upon given pattern and then executes a callback passing
 * in each exports as a param
 * @param {String|Array} patterns a glob pattern or Array of patterns
 * @param {Object} options see https://github.com/isaacs/node-glob
 * @param {Function} callback a callback that receives each exports
 * @return {Promise} a promise
 */
function load (pattern, options, callback) {
  var deferred = new promise.Deferred();

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  function process(file) {
    var pathe = path.resolve(path.normalize(file));
    if (callback) {
      callback(require(pathe));
    } else {
      require(pathe);
    }
  }

  glob(pattern, options, function (error, files) {
    if (error) {
      return error;
    }
    files.forEach(function (file) {
      process(file);
    });
    deferred.resolve();
  });

  return deferred;
};

module.exports.load = load;
