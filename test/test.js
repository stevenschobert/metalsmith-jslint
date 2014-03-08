(function () {
  'use strict';

  var expect = require('expect.js'),
      metalsmith = require('metalsmith'),
      jslint = require('../index'),
      path = require('path'),
      rimraf = require('rimraf'),
      StdOutFixture = require('fixture-stdout'),
      logFixture = new StdOutFixture();

  describe('jslint', function () {
    var logs = [],
        metal = metalsmith(__dirname)
                  .source('fixtures')
                  .destination('out');

    // capture all console log statements
    logFixture.capture(function (string) {
      logs.push({
        message: string
      });
    });

    beforeEach(function (done) {
      // clean out build directory
      rimraf(path.join(__dirname, 'out/'), done);
      // reset captured logs
      logs = [];
    });

    it('should lint files', function (done) {
      metal.use(jslint()).build(function (err) {
        var foundLint = false;

        if (err) {
          console.log(err);
        }

        // search the logs
        logs.forEach(function (log) {
          if (/.*linty\.js*/.test(log.message)) {
            foundLint = true;
          }
        });

        expect(foundLint).to.be(true);
        done();
      });
    });

    it('should ignore non-js files', function (done) {
      metal.use(jslint()).build(function (err) {
        var foundTextFile = false;

        if (err) {
          throw err;
        }

        // search logs
        logs.forEach(function (log) {
          if (/.*\.txt.*/.test(log.message)) {
            foundTextFile = true;
          }
        });

        expect(foundTextFile).to.be(false);
        done();
      });
    });

    it('should allow a fail on error option', function () {
      expect(metal.use(jslint({
        failOnError: true
      })).build).to.throwError();
    });
  });
}());
