var testy = require('../lib/testy');
    
var test = new testy({ expected : 1, name : 'Failing test, is meant to be red!!!'});
var assert = test.assert;

test.finish();