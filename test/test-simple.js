var testy = require('../lib/testy')(),
    assert = testy.assert;

testy.expected = 1;
assert.strictEqual(1, 1);
testy.finish();