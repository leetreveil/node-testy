var testy = require('../lib/testy');
    
var test = new testy();
var assert = test.assert;

test.expected = 1;
test.name = 'Some simple test';
assert.strictEqual(1, 1);
test.finish();