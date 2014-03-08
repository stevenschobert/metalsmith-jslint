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
        Object.keys(files).forEach(function(filename) {
          var file = files[filename],
              lint;
          if (fileIsJs(filename)) {
            lint = linter.lint(file.contents.toString(), defaultArgs);
            reporter.report(filename, lint, defaultArgs.color, defaultArgs.terse);
          }
        });

        // throw exception if set to fail on error
        if (this.failOnError === true) {
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
