var testy = require('./testy');
    
var test = new testy('Failing test, is meant to be red!!!');
var assert = test.assert;
test.expected = 1;