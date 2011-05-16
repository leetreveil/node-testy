var testy = require('../lib/testy')(),
    assert = testy.assert;

//this tests the timeout ability of
//the framework, 1 test should be ran
//even though we havent explicitly told
//the framework that the test has finished 
testy.expected = 1;
assert.strictEqual(1, 1);