var testy = require('../lib/testy');
    
var testy1 = new testy();
var assert1 = testy1.assert;

testy1.expected = 1;
assert1.strictEqual(1, 1);
testy1.finish();


var testy2 = new testy();
var assert2 = testy2.assert;

testy2.expected = 1;
assert2.strictEqual(1, 1);
testy2.finish();