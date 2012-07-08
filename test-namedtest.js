var testy = require('./testy');
    
var test = new testy('Some named test');
var assert = test.assert;
test.expected = 1;

assert.strictEqual(1, 1);