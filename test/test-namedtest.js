var testy = require('../lib/testy');
    
var test = new testy({ expected : 1, name : 'Some simple test' });
var assert = test.assert;

assert.strictEqual(1, 1);
test.finish();