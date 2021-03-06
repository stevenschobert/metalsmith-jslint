(function () {
  'use strict';

  var expect = require('expect.js'),
      metalsmith = require('metalsmith'),
      jslint = require('../lib/index'),
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
      // reset captured logs
      logs = [];
      // clean out build directory
      rimraf(path.join(__dirname, 'out/'), done);
    });

    describe('core', function () {
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
    });

    describe('failOnError option', function () {
      it('should not fail if no errors found', function (done) {
        metal.source('fixtures/clean')
          .use(jslint({
            failOnError: true
          }))
          .build(function (err) {
            expect(err).to.be(null);
            done();
          });
      });

      it('should throw exception if lint found', function () {
        expect(metal.use(jslint({
          failOnError: true
        })).build).to.throwError();
      });
    });
  });
}());
