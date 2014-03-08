metalsmith-jslint
=================

A Metalsmith plugin for JSLint.

## Getting Started

If you haven't checked out [Metalsmith](http://www.metalsmith.io/) before, head over to their
website and check out the documentation.

## Installation

Metalsmith-jslint is available via npm. Simply install it and require it in your application.

```sh
npm install --save metalsmith-json
```

## Usage

To use jslint inside your Metalsmith application, you just add the function to your build steps via
the `use` method.

```js
var Metalsmith = require('metalsmith'),
    jslint = require('metalsmith-jslint');

Metalsmith(__dirname)
  .use(jslint()) // <-- boom!
  .build();
```

Notice that you need to actually invoke the function insie the `.use` method. This is because you
can also pass options to JSLint to customize it!

## Options

You can also pass a configuration object into the `jslint` function to change it's behavior. A full
list of options is available below:

```js
Metalsmith(__dirname)
  .use(jslint({
    failOnError: true
  })
  .build();
```

#### failOnError

Throw an exception if any lint is found. You can either have this halt your build process, or handle
the error more directly inside the Metalsmith's `.build` callback.

## Credits

Thanks to [Segment.io](http://github.com/segmentio) for creating and open-sourcing Metalsmith!
