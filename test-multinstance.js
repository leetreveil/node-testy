var testy = require('./testy');
    
var testy1 = new testy({ expected : 1 });
var assert1 = testy1.assert;

assert1.strictEqual(1, 1);
testy1.finish();


var testy2 = new testy({ expected : 1 });
var assert2 = testy2.assert;

assert2.strictEqual(1, 1);
testy2.finish();