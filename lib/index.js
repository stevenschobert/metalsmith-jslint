(function () {
  'use strict';

  var linter = require('jslint/lib/linter'),
      reporter = require('jslint/lib/reporter'),
      jslint = require('jslint/lib/main'),

      defaultArgs = jslint.parseArgs(process.argv),

      fileIsJs = function fileIsJs (filename) {
        return filename.split('.').pop().toLowerCase() === 'js';
      },

      lintRunner = function lintRunner (files, metalsmith, done) {
        var foundLint = false;

        Object.keys(files).forEach(function(filename) {
          var file = files[filename],
              lint;

          // only lint js files
          if (fileIsJs(filename)) {
            // lint file
            lint = linter.lint(file.contents.toString(), defaultArgs);
            // report errors
            reporter.report(filename, lint, defaultArgs.color, defaultArgs.terse);
            // check for errors
            if (lint.ok === false) {
              foundLint = true;
            }
          }
        });

        // throw exception if set to fail on error
        if (this.failOnError === true && foundLint === true) {
          throw new Error('Found linty code!');
        }

        done();
      },

      metalLint = function metalLint (options) {
        var config = options || {};
        return lintRunner.bind(config);
      };


  module.exports = metalLint;
}());
