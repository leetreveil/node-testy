var testy = require('./testy');

//this tests the timeout ability of
//the framework, 1 test should be ran
//even though we havent explicitly told
//the framework that the test has finished
var test = new testy({ timeout : 200, expected : 1 });
assert = test.assert;
assert.strictEqual(1, 1);