# Loader

A very simple loader to ```require()``` based on glob pattern matching. Please contribute by writing tests and examples.

[![Build Status](https://travis-ci.org/Droppe/Loader.png?branch=master)](https://travis-ci.org/Droppe/Loader)

## Installation

    $ npm install node-glob-loader

## Features
  - supports glob/multi glob matching ala [node-glob](https://github.com/isaacs/node-glob), [multi-glob](https://github.com/busterjs/multi-glob)
  - supports deferrals ala [promised-io](https://github.com/kriszyp/promised-io)
  - suports asynchronous loading via [async](https://github.com/caolan/async).

## Signatures

```js
function load(pattern, [options], [callback]) {
  /*...*/
}
```

- pattern: a glob pattern or an array of patterns
- options: an optional object
 - strict: When set to true, glob will yield an error if a pattern matches no files.
 - limit: ensures synchronised loading. *Note that under most use-cases files will be loaded 1 at a time*
- callback: an optional callback that is called once per matched file with its ```exports``` and the file’s name.

## Examples

### Load a single file
```js
  var loader = require('node-glob-loader');

  loader.load('./foo.js', function (exports,filename) {
    console.log('Loaded ' + filename);
    exports.foo();
  });
```

### Load a directory... When you're [DONE](https://github.com/kriszyp/promised-io) – YEAH!
```js
  var loader = require('node-glob-loader');

  loader.load('./foo/*.js', function (exports,filename) {
    console.log('Loaded ' + filename);
    exports.foo();
  }).done(function () {
    // Yeah!
  });
```

### Load the ```foo``` directory excluding ```bar.js```
```js
  var loader = require('node-glob-loader');

  loader.load('./foo/[!bar]*.js', function (exports, filename) {
    console.log('Loaded ' + filename);
    exports.bar();
  });
```

### Load ```.js``` files in ```foo```'s tree [THEN](https://github.com/kriszyp/promised-io) do something nice
```js
var loader = require('node-glob-loader');

loader.load('./foo/**/*.js', function (exports, filename) {
  console.log('Loaded ' + filename);
  exports.bar();
}).then(funtion () {
  // Do Something Nice
});
```

### Like the above, sans fancy
```js
var loader = require('node-glob-loader');

loader.load('./foo/**/*.js');
```

### Leeloo Dallas mul-ti-glob: Load multiple patterns at once
```js
var loader = require('node-glob-loader');

loader.load(['./foo.js', './foo/**/*.js'], function () {
  exports.foo();
});
```

### Make the @hueniverse [Hapi](http://hapijs.com/) with a real world example

```js
var config = require("./config/" + process.env.NODE_ENV),
  pckg = require("./package.json"),
  bunyan = require("bunyan"),
  hapi = require("hapi"),
  server,
  logger;

logger = bunyan.createLogger({
  name: pckg.name,
  serializers: bunyan.stdSerializers
});

server = hapi.createServer(
  config.application.host,
  config.application.port,
  config.application.options
);

server.app.logger = logger;
server.app.configuration = config;

server.start(function (error, info) {
  var loader;
  if (error) {
    return logger.error(error);
  }

  logger.info("Server started @" + server.info);

  loader = require("node-glob-loader");
  loader.load("./application/routes/*.*", function (routes, name) {
    logger.info("Loading routes from " + name);
    server.route(routes);
  });
});
```

## [RTFM:Pattern-Matching](http://www.gnu.org/software/bash/manual/bashref.html#Pattern-Matching)

Any character that appears in a pattern, other than the special pattern characters described below, matches itself. The NUL character may not occur in a pattern. A backslash escapes the following character; the escaping backslash is discarded when matching. The special pattern characters must be quoted if they are to be matched literally.

The special pattern characters have the following meanings:

###*
Matches any string, including the null string. When the globstar shell option is enabled, and ‘*’ is used in a filename expansion context, two adjacent ‘*’s used as a single pattern will match all files and zero or more directories and subdirectories. If followed by a ‘/’, two adjacent ‘*’s will match only directories and subdirectories.

###?
Matches any single character.

###[…]
Matches any one of the enclosed characters. A pair of characters separated by a hyphen denotes a range expression; any character that sorts between those two characters, inclusive, using the current locale’s collating sequence and character set, is matched. If the first character following the ‘[’ is a ‘!’ or a ‘^’ then any character not enclosed is matched. A ‘-’ may be matched by including it as the first or last character in the set. A ‘]’ may be matched by including it as the first character in the set. The sorting order of characters in range expressions is determined by the current locale and the value of the LC_COLLATE shell variable, if set.

For example, in the default C locale, ‘[a-dx-z]’ is equivalent to ‘[abcdxyz]’. Many locales sort characters in dictionary order, and in these locales ‘[a-dx-z]’ is typically not equivalent to ‘[abcdxyz]’; it might be equivalent to ‘[aBbCcDdxXyYz]’, for example. To obtain the traditional interpretation of ranges in bracket expressions, you can force the use of the C locale by setting the LC_COLLATE or LC_ALL environment variable to the value ‘C’.

Within ‘[’ and ‘]’, character classes can be specified using the syntax [:class:], where class is one of the following classes defined in the POSIX standard:

- alnum
- alpha
- ascii
- blank
- cntrl
- digit
- graph
- lower
- print
- punct
- space
- upper
- word
- xdigit

A character class matches any character belonging to that class. The word character class matches letters, digits, and the character ‘_’.

Within ‘[’ and ‘]’, an equivalence class can be specified using the syntax [=c=], which matches all characters with the same collation weight (as defined by the current locale) as the character c.

Within ‘[’ and ‘]’, the syntax [.symbol.] matches the collating symbol symbol.

If the extglob shell option is enabled using the shopt builtin, several extended pattern matching operators are recognized. In the following description, a pattern-list is a list of one or more patterns separated by a ‘|’. Composite patterns may be formed using one or more of the following sub-patterns:

###?(pattern-list)
Matches zero or one occurrence of the given patterns.

###*(pattern-list)
Matches zero or more occurrences of the given patterns.

###+(pattern-list)
Matches one or more occurrences of the given patterns.

###@(pattern-list)
Matches one of the given patterns.

###!(pattern-list)
Matches anything except one of the given patterns.


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
