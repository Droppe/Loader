# Loader

A very simple loader to ```require()``` based on glob pattern matching.

## Installation

    $ npm install node-glob-loader

## Features
  - supports glob matching ala [node-glob](https://github.com/isaacs/node-glob)
  - supports deferrals ala [promised-io](https://github.com/kriszyp/promised-io)

## Examples

### Load a Single file
```js
  var loader = require('node-glob-loader')

  loader.load('./foo.js', function (exports) {
    exports.foo();
  });
```

### Load a Directory
```js
  var loader = require('node-glob-loader')

  loader.load('./foo/*.js', function (exports) {
    exports.foo();
  }).done(function () {
    //Yeah!
  });
```

### Exclude foo.js
```js
  var loader = require('node-glob-loaderr')

  loader.load('./foo/[!foo]*.js', function (exports) {
    exports.bar();
  });
```

### [RTFM:Pattern-Matching](http://www.gnu.org/software/bash/manual/bashref.html#Pattern-Matching)

## Signatures

```js
function load(pattern, options, callback) {
  /*...*/
}
```

- pattern: A glob pattern
- options: an optional [options](https://github.com/isaacs/node-glob) object
- callback: a callback that is called once per matched file with ```exports```


## License 

(The MIT License)

Copyright (c) 2013 Droppe &lt;robert@drop.pe&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
