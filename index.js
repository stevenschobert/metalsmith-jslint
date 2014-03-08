(function () {
  'use strict';

  var linter = require('jslint/lib/linter'),
      reporter = require('jslint/lib/reporter'),
      jslint = require('jslint/lib/main'),

      defaultArgs = jslint.parseArgs(process.argv),

      fileIsJs = function fileIsJs(filename) {
        return filename.split('.').pop().toLowerCase() === 'js';
      },

      metalLint = function metalLint(files, metalsmith, done) {
        Object.keys(files).forEach(function(filename) {
          var file = files[filename],
              lint;
          if (fileIsJs(filename)) {
            lint = linter.lint(file.contents.toString(), defaultArgs);
            reporter.report(filename, lint, defaultArgs.color, defaultArgs.terse);
          }
        });
        done();
      };

  module.exports = metalLint;
}());
