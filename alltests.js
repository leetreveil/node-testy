if (module == require.main) {

  var spawn = require('child_process').spawn;
  var path  = require('path');
  var assert = require('assert');

  var tests = {
    'test-fail.js': 1,
    'test-multinstance.js': 0,
    'test-namedtest.js': 0,
    'test-simple.js': 0,
    'test-stacktrace': (process.version.slice(0, 5) === 'v0.10') ? 8 : 0
  };

  for (var test in tests) {
    var expectedRetCode = tests[test];
    var testProcess = spawn(process.execPath, [path.join(__dirname, test)]);

    testProcess.stdout.on('data', function (data) {
      process.stdout.write(data.toString());
    });

    testProcess.stderr.on('data', function (data) {
      process.stderr.write(data.toString());
    });

    (function (expectedRetCode) {
      testProcess.on('exit', function (code, signal) {
        assert.equal(expectedRetCode, code);
      });
    })(expectedRetCode);
  }
}