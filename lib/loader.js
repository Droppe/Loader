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
  promise = require('promised-io/promise');

/**
 * Loads files based upon given pattern and then executes a callback passing
 * in each exports as a param
 * @param {[type]} patterns An array of file patterns
 * @param {Function} callback a callback that receives each exports
 * @return {Promise} a promise
 */
exports.load = function (patterns, callback) {
  var deferred = new promiseio.Deferred(),
    defferals = [];

  return deferred;
};