var testy = require('./testy');
    
var test = new testy();
var assert = test.assert;

assert.strictEqual(1, 1);
test.finish();