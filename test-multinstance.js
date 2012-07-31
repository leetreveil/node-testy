var testy = require('./testy');
    
var testy1 = new testy('testA');
var assert1 = testy1.assert;
testy1.expected = 1;

assert1.strictEqual(1, 1);


var testy2 = new testy('testB');
var assert2 = testy2.assert;
testy2.expected = 1;

assert2.strictEqual(1, 1);