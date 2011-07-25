#What is it?
Super simple testing framework. No added sugar. 100~ LOC.


#Installation
Install with npm:

npm install testy

#API

##Simple
````javascript
var testy = require('testy');

var test = new testy();
var assert = test.assert;

assert.equal(true, true);
````


##Most complex
`````javascript
var testy = require('testy');

var options = { expected : 2, name : 'Some simple test', timeout : 3000 };
var test = new testy(options);
var assert = test.assert;

assert.Equal(1, 1);
assert.deepEqual([1, 2, 3], [1, 2, 3]);

test.finish();
````